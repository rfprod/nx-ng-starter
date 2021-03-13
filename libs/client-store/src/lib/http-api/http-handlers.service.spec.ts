import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { AppClientTranslateModule } from '@nx-ng-starter/client-translate';
import {
  AppLocalStorageMock,
  getTestBedConfig,
  newTestBedMetadata,
} from '@nx-ng-starter/client-unit-testing';
import { HTTP_STATUS } from '@nx-ng-starter/client-util';
import { Apollo } from 'apollo-angular';
import { ExecutionResult, GraphQLError } from 'graphql';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';

import { AppHttpProgressModule } from '../http-progress/http-progress.module';
import {
  AppToasterService,
  toasterServiceProvider,
} from '../http-progress/services/toaster/toaster.service';
import { AppHttpHandlersService } from './http-handlers.service';

describe('AppHttpHandlersService', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [AppClientTranslateModule.forRoot(), AppHttpProgressModule.forRoot()],
    providers: [toasterServiceProvider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let service: AppHttpHandlersService;
  let apollo: Apollo;
  let httpTestingController: HttpTestingController;
  let localStorage: AppLocalStorageMock;
  let toaster: AppToasterService;
  let store: Store;
  let spy: {
    store: {
      dispatch: jest.SpyInstance;
    };
    service: {
      checkErrorStatusAndRedirect: jest.SpyInstance;
    };
  };

  beforeEach(
    waitForAsync(() => {
      localStorage = window.localStorage;
      jest.spyOn(localStorage, 'setItem');

      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          service = TestBed.inject(AppHttpHandlersService);
          toaster = TestBed.inject(AppToasterService);
          httpTestingController = TestBed.inject(HttpTestingController);
          apollo = TestBed.inject(Apollo);
          store = TestBed.inject(Store);
          spy = {
            store: {
              dispatch: jest.spyOn(store, 'dispatch'),
            },
            service: {
              checkErrorStatusAndRedirect: jest.spyOn(service, 'checkErrorStatusAndRedirect'),
            },
          };
        });
    }),
  );

  afterEach(() => {
    httpTestingController
      .match((req: HttpRequest<unknown>): boolean => true)
      .forEach((req: TestRequest) => (!req.cancelled ? req.flush({}) : null));
    httpTestingController.verify();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(apollo).toBeDefined();
    expect(toaster).toBeDefined();
  });

  it('should have variables and methods defined', () => {
    expect(service.defaultHttpTimeout).toEqual(expect.any(Number));
    expect(service.graphQlEndpoint).toEqual(expect.any(Function));
    expect(service.getGraphQLHttpHeaders).toEqual(expect.any(Function));
    expect(service.getEndpoint).toEqual(expect.any(Function));
    expect(service.extractGraphQLData).toEqual(expect.any(Function));
    expect(service.checkErrorStatusAndRedirect).toEqual(expect.any(Function));
    expect(service.handleError).toEqual(expect.any(Function));
    expect(service.handleGraphQLError).toEqual(expect.any(Function));
    expect(service.pipeHttpResponse).toEqual(expect.any(Function));
    expect(service.pipeGraphQLRequest).toEqual(expect.any(Function));
    expect(service.tapError).toEqual(expect.any(Function));
    expect(service.createApolloLinkFor).toEqual(expect.any(Function));
  });

  describe('extractGraphQLData', () => {
    it(
      'should return an Array',
      waitForAsync(() => {
        const executionResult: ExecutionResult = {
          data: [{ x: 'x' }, { y: 'y' }],
        };
        void service.extractGraphQLData(executionResult).pipe(
          tap(result => {
            expect(result).toEqual(expect.any(Array));
          }),
        );

        void service.extractGraphQLData(executionResult).pipe(
          tap(result => {
            expect(result).toEqual(executionResult.data);
          }),
        );
      }),
    );

    it(
      'should return execution result if response does not contain nested data object',
      waitForAsync(() => {
        const executionResult: ExecutionResult = {};
        void service.extractGraphQLData(executionResult).pipe(
          tap(result => {
            expect(result).toEqual(expect.any(Object));
          }),
        );

        void service.extractGraphQLData(executionResult).pipe(
          tap(result => {
            expect(result).toEqual(executionResult);
          }),
        );
      }),
    );
  });

  it('extractGraphQLData should throw errors if get', () => {
    const error: GraphQLError = new GraphQLError('message');
    void service.extractGraphQLData({ errors: [error] }).pipe(
      tap(
        () => {
          // empty
        },
        errors => {
          expect(errors[0]).toBe(error);
        },
      ),
    );
  });

  it(
    'pipeGraphQLRequest should check error if 401 status',
    waitForAsync(() => {
      const q$ = cold('---#|', null, { networkError: { status: HTTP_STATUS.BAD_REQUEST } });
      void service.pipeGraphQLRequest(q$).subscribe(
        () => null,
        () => {
          expect(spy.service.checkErrorStatusAndRedirect).toHaveBeenCalledWith(
            HTTP_STATUS.UNAUTHORIZED,
          );
        },
      );
      getTestScheduler().flush();
    }),
  );

  it('checkErrorStatusAndRedirect should reset user if error status is 401', () => {
    service.checkErrorStatusAndRedirect(HTTP_STATUS.BAD_REQUEST);
    expect(spy.store.dispatch).not.toHaveBeenCalled();
    service.checkErrorStatusAndRedirect(HTTP_STATUS.UNAUTHORIZED);
    expect(spy.store.dispatch).toHaveBeenCalled();
  });

  describe('handleError', () => {
    it(
      'should handle errors properly #1',
      waitForAsync(() => {
        const errRes = new HttpErrorResponse({
          status: 400,
          statusText: 'error status text',
        });
        service
          .handleError(errRes)
          .toPromise()
          .then(
            () => true,
            (error: string) => {
              expect(error).toEqual(service.getErrorMessage(errRes));
            },
          );
      }),
    );

    it(
      'should handle errors properly #2',
      waitForAsync(() => {
        const errRes = new HttpErrorResponse({});
        service
          .handleError(errRes)
          .toPromise()
          .then(
            () => true,
            (error: string) => {
              expect(error).toEqual(service.getErrorMessage(errRes));
            },
          );
      }),
    );
  });

  describe('handleGraphQLError', () => {
    it('should return an Observable', () => {
      expect(service['handleGraphQLError']('err')).toEqual(expect.any(Observable));
    });
  });

  it(
    'graphQLHttpHeaders should return new http headers with authorization header set',
    waitForAsync(() => {
      void service.userToken$
        .pipe(
          concatMap(userToken => {
            const newHeadersObj: {
              [name: string]: string | string[];
            } = {
              Authorization: `Token ${userToken}`,
            };
            const newHeaders: HttpHeaders = new HttpHeaders(newHeadersObj);
            return service.getGraphQLHttpHeaders().pipe(map(headers => ({ headers, newHeaders })));
          }),
          tap(({ headers, newHeaders }) => {
            expect(headers.get('Authorization')).toEqual(newHeaders.get('Authorization'));
          }),
        )
        .subscribe();
    }),
  );

  it('pipeHttpResponse should work correctly', () => {
    const observable = of({ data: {} });
    let pipedRequest = service.pipeHttpResponse(observable);
    expect(pipedRequest).toEqual(expect.any(Observable));
    pipedRequest = service.pipeHttpResponse(observable);
  });
});

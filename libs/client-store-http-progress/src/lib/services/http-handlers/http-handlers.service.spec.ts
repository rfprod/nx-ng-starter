import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { AppClientTranslateModule } from '@app/client-translate';
import { getTestBedConfig, newTestBedMetadata, spyOnFunctions, TClassMemberFunctionSpiesObject } from '@app/client-unit-testing';
import { HTTP_STATUS } from '@app/client-util';
import { Store } from '@ngxs/store';
import { Apollo, ApolloModule } from 'apollo-angular';
import { ExecutionResult, GraphQLError } from 'graphql';
import { Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';

import { httpProgressActions } from '../../http-progress.actions';
import { AppHttpProgressStoreModule } from '../../http-progress.module';
import { AppToasterService, toasterServiceProvider } from '../toaster/toaster.service';
import { AppHttpHandlersService } from './http-handlers.service';

describe('AppHttpHandlersService', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [ApolloModule, AppClientTranslateModule.forRoot(), AppHttpProgressStoreModule.forRoot()],
    providers: [toasterServiceProvider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let service: AppHttpHandlersService;
  let serviceSpies: TClassMemberFunctionSpiesObject<AppHttpHandlersService>;
  let apollo: Apollo;
  let httpTestingController: HttpTestingController;
  let toaster: AppToasterService;
  let store: Store;
  let storeDispatchSpy: jest.SpyInstance;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        service = TestBed.inject(AppHttpHandlersService);
        serviceSpies = spyOnFunctions<AppHttpHandlersService>(service);
        toaster = TestBed.inject(AppToasterService);
        httpTestingController = TestBed.inject(HttpTestingController);
        apollo = TestBed.inject(Apollo);
        store = TestBed.inject(Store);
        storeDispatchSpy = jest.spyOn(store, 'dispatch');
      });
  }));

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
    it('should return an Array', waitForAsync(() => {
      const executionResult = {
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
    }));

    it('should return execution result if response does not contain nested data object', waitForAsync(() => {
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
    }));
  });

  it('extractGraphQLData should throw errors if get', () => {
    const error: GraphQLError = new GraphQLError('message');
    void service.extractGraphQLData({ errors: [error] }).pipe(
      tap({
        error: errors => {
          expect(errors[0]).toBe(error);
        },
      }),
    );
  });

  it('pipeGraphQLRequest should check error if 401 status', waitForAsync(() => {
    const observable$ = of({ networkError: { status: HTTP_STATUS.BAD_REQUEST } });
    void service
      .pipeGraphQLRequest(observable$)
      .pipe(tap({ error: () => expect(serviceSpies.checkErrorStatusAndRedirect).toHaveBeenCalledWith(HTTP_STATUS.UNAUTHORIZED) }))
      .subscribe();
  }));

  it('checkErrorStatusAndRedirect should reset user if error status is 401', () => {
    service.checkErrorStatusAndRedirect(HTTP_STATUS.BAD_REQUEST);
    expect(storeDispatchSpy).not.toHaveBeenCalled();
    service.checkErrorStatusAndRedirect(HTTP_STATUS.UNAUTHORIZED);
    expect(storeDispatchSpy).toHaveBeenCalled();
  });

  describe('handleError', () => {
    it('should handle errors properly #1', waitForAsync(() => {
      const errRes = new HttpErrorResponse({
        status: 400,
        statusText: 'error status text',
      });
      void service
        .handleError(errRes)
        .pipe(
          catchError((error: Error) => {
            expect(error).toEqual(new Error(service.getErrorMessage(errRes)));
            return of(null);
          }),
        )
        .subscribe();
    }));

    it('should handle errors properly #2', waitForAsync(() => {
      const errRes = new HttpErrorResponse({});
      void service
        .handleError(errRes)
        .pipe(
          catchError((error: Error) => {
            expect(error).toEqual(new Error(service.getErrorMessage(errRes)));
            return of(null);
          }),
        )
        .subscribe();
    }));
  });

  describe('handleGraphQLError', () => {
    it('should return an Observable', () => {
      expect(service['handleGraphQLError']('err')).toEqual(expect.any(Observable));
    });
  });

  it('graphQLHttpHeaders should return new http headers with authorization header set', waitForAsync(() => {
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
  }));

  describe('pipeHttpResponse', () => {
    it('should pipe observable that returns data correctly', waitForAsync(() => {
      const observable = of({ data: {} });
      void service
        .pipeHttpResponse(observable)
        .pipe(
          tap(() => {
            expect(serviceSpies.handleError).not.toHaveBeenCalled();
            expect(storeDispatchSpy).toHaveBeenCalledWith(new httpProgressActions.stopProgress({ mainView: true }));
          }),
        )
        .subscribe();
    }));

    it('should pipe observable that throws an error correctly', waitForAsync(() => {
      const error = new Error('');
      const observable = throwError(() => error);
      void service
        .pipeHttpResponse(observable)
        .pipe(
          tap(() => {
            expect(serviceSpies.handleError).toHaveBeenCalledWith(error, true);
            expect(storeDispatchSpy).toHaveBeenCalledWith(new httpProgressActions.stopProgress({ mainView: true }));
          }),
        )
        .subscribe();
    }));
  });
});

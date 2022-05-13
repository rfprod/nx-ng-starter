import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { ApolloLink } from '@apollo/client/core';
import { AppUserState } from '@app/client-store-user';
import { AppClientTranslateModule } from '@app/client-translate';
import {
  flushHttpRequests,
  getTestBedConfig,
  newTestBedMetadata,
  spyOnFunctions,
  TClassMemberFunctionSpiesObject,
} from '@app/client-unit-testing';
import { HTTP_STATUS, IWebClientAppEnvironment, WEB_CLIENT_APP_ENV } from '@app/client-util';
import { NgxsModule, Store } from '@ngxs/store';
import { Apollo, ApolloModule } from 'apollo-angular';
import { Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';

import { httpProgressActions } from '../../http-progress.actions';
import { AppHttpProgressStoreModule } from '../../http-progress.module';
import { AppToasterService, toasterServiceProvider } from '../toaster/toaster.service';
import { AppHttpHandlersService } from './http-handlers.service';

describe('AppHttpHandlersService', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [
      ApolloModule,
      AppClientTranslateModule.forRoot(),
      AppHttpProgressStoreModule.forRoot(),
      NgxsModule.forFeature([AppUserState]),
    ],
    providers: [toasterServiceProvider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let service: AppHttpHandlersService;
  let serviceSpies: TClassMemberFunctionSpiesObject<AppHttpHandlersService>;
  let apollo: Apollo;
  let httpTestingController: HttpTestingController;
  let toaster: AppToasterService;
  let env: IWebClientAppEnvironment;
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
        env = TestBed.inject(WEB_CLIENT_APP_ENV);
        store = TestBed.inject(Store);
        storeDispatchSpy = jest.spyOn(store, 'dispatch');
      });
  }));

  afterEach(() => {
    flushHttpRequests(httpTestingController, true);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(apollo).toBeDefined();
    expect(toaster).toBeDefined();
  });

  it('should have variables and methods defined', () => {
    expect(service.defaultHttpTimeout).toEqual(expect.any(Number));
    expect(service.getGraphQLHttpHeaders).toEqual(expect.any(Function));
    expect(service.getEndpoint).toEqual(expect.any(Function));
    expect(service.checkErrorStatusAndRedirect).toEqual(expect.any(Function));
    expect(service.handleError).toEqual(expect.any(Function));
    expect(service.handleGqlError).toEqual(expect.any(Function));
    expect(service.pipeHttpResponse).toEqual(expect.any(Function));
    expect(service.pipeGqlResponse).toEqual(expect.any(Function));
    expect(service.tapError).toEqual(expect.any(Function));
    expect(service.createGqlLink).toEqual(expect.any(Function));
  });

  it('getGraphQLHttpHeaders should return new http headers with authorization header set', waitForAsync(() => {
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

  it('getEndpoint should return an API endpoint', () => {
    expect(service.getEndpoint('test')).toEqual(`${env.api}/test`);
    expect(service.getEndpoint('/test')).toEqual(`${env.api}/test`);
  });

  describe('pipeGqlResponse', () => {
    it('pipeGraphQlResponse should check error for 401 status', waitForAsync(() => {
      const observable$ = <Observable<never>>of({ networkError: { status: HTTP_STATUS.BAD_REQUEST } });
      void service
        .pipeGqlResponse(observable$)
        .pipe(
          tap({
            error: err => {
              expect(serviceSpies.checkErrorStatusAndRedirect).toHaveBeenCalledWith(HTTP_STATUS.UNAUTHORIZED);
              expect(serviceSpies.handleGqlError).not.toHaveBeenCalledWith(err);
            },
          }),
        )
        .subscribe();
    }));

    it('pipeGqlResponse should pipe observables that throw errors correctly', waitForAsync(() => {
      const error = new Error('');
      const observable$ = throwError(() => error);
      void service
        .pipeGqlResponse(observable$)
        .pipe(
          tap({
            error: err => {
              expect(serviceSpies.checkErrorStatusAndRedirect).toHaveBeenCalledWith(HTTP_STATUS.UNAUTHORIZED);
              expect(serviceSpies.handleGqlError).toHaveBeenCalledWith(err);
            },
          }),
        )
        .subscribe();
    }));
  });

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

  it('createApolloLink should return the newtork link observable', waitForAsync(() => {
    void service
      .createGqlLink()
      .pipe(
        tap(link => {
          expect(link instanceof ApolloLink).toBeTruthy();
        }),
      )
      .subscribe();
  }));

  describe('getErrorMessage', () => {
    it('should process an error as expected if the message property is present', () => {
      const error = <HttpErrorResponse>{ message: 'test' };
      expect(service.getErrorMessage(error)).toEqual(error.message);
    });

    it('should process an error as expected if the error property is present', () => {
      const error = <HttpErrorResponse>{ error: 'test' };
      expect(service.getErrorMessage(error)).toEqual(error.error);
    });

    it('should process an error as expected if the status property is present', () => {
      const error = <HttpErrorResponse>{ status: 400, statusText: 'test' };
      expect(service.getErrorMessage(error)).toEqual(`${error.status} - ${error.statusText}`);
    });

    it('should process an error as expected if non of the expected properties are present', () => {
      const error = <HttpErrorResponse>{};
      expect(service.getErrorMessage(error)).toEqual('Server error');
    });
  });

  describe('handleGqlError', () => {
    it('should return an Observable', () => {
      expect(service['handleGqlError']('err')).toEqual(expect.any(Observable));
    });
  });

  describe('pipeHttpResponse', () => {
    it('should pipe observables that return data correctly', waitForAsync(() => {
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

    it('should pipe observables that throw errors correctly', waitForAsync(() => {
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

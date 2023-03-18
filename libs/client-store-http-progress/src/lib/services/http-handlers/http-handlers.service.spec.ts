import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ApolloLink, Operation, ServerError, ServerParseError } from '@apollo/client/core';
import { GraphQLErrors, NetworkError } from '@apollo/client/errors';
import { ErrorResponse } from '@apollo/client/link/error';
import { flushHttpRequests, getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { AppTranslateModule } from '@app/client-translate';
import { HTTP_STATUS, IWebClientAppEnvironment, WEB_CLIENT_APP_ENV } from '@app/client-util';
import { Store } from '@ngrx/store';
import { Apollo, ApolloModule, gql } from 'apollo-angular';
import { GraphQLError } from 'graphql';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { httpProgressActions } from '../../http-progress.actions';
import { AppHttpProgressStoreModule } from '../../http-progress.module';
import { AppToasterService, toasterServiceProvider } from '../toaster/toaster.service';
import { AppHttpHandlersService } from './http-handlers.service';

describe('AppHttpHandlersService', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [ApolloModule, AppTranslateModule.forRoot(), AppHttpProgressStoreModule.forRoot()],
    providers: [toasterServiceProvider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let service: AppHttpHandlersService;
  let serviceSpies: {
    checkErrorStatusAndRedirect: jest.SpyInstance;
    handleGqlError: jest.SpyInstance;
    handleError: jest.SpyInstance;
  };
  let apollo: Apollo;
  let httpTestingController: HttpTestingController;
  let toaster: AppToasterService;
  let env: IWebClientAppEnvironment;
  let store: Store;
  let storeDispatchSpy: jest.SpyInstance;
  let router: Router;
  let routerNavigateSpy: jest.SpyInstance;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        service = TestBed.inject(AppHttpHandlersService);
        serviceSpies = {
          checkErrorStatusAndRedirect: jest.spyOn(service, 'checkErrorStatusAndRedirect'),
          handleGqlError: jest.spyOn(service, 'handleGqlError'),
          handleError: jest.spyOn(service, 'handleError'),
        };
        toaster = TestBed.inject(AppToasterService);
        httpTestingController = TestBed.inject(HttpTestingController);
        apollo = TestBed.inject(Apollo);
        env = TestBed.inject(WEB_CLIENT_APP_ENV);
        store = TestBed.inject(Store);
        storeDispatchSpy = jest.spyOn(store, 'dispatch');
        router = TestBed.inject(Router);
        routerNavigateSpy = jest.spyOn(router, 'navigate').mockImplementation(
          () =>
            new Promise<boolean>(resolve => {
              resolve(true);
            }),
        );
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

  it('getGraphQLHttpHeaders should return new http headers with authorization header set', () => {
    const userToken = 'test';
    const newHeadersObj: {
      [name: string]: string | string[];
    } = {
      Authorization: `Token ${userToken}`,
    };
    const newHeaders: HttpHeaders = new HttpHeaders(newHeadersObj);
    const headers = service.getGraphQLHttpHeaders(userToken);
    expect(headers.get('Authorization')).toEqual(newHeaders.get('Authorization'));
  });

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

  describe('gqlLinkSplitTest', () => {
    it('should resolve to false if query name is UploadFile', () => {
      const query = gql`
        query UploadFile($id: String!) {
          matcomp(id: $id) {
            id
            name
          }
        }
      `;
      const operation = <Operation>{
        query,
      };
      const splitTest = service.gqlLinkSplitTest();
      const result = splitTest(operation);
      expect(result).toBeFalsy();
    });

    it('should resolve to false if query name is defined and is no UploadFile', () => {
      const query = gql`
        query Test($id: String!) {
          matcomp(id: $id) {
            id
            name
          }
        }
      `;
      const operation = <Operation>{
        query,
      };
      const splitTest = service.gqlLinkSplitTest();
      const result = splitTest(operation);
      expect(result).toBeTruthy();
    });
  });

  describe('gqlErrorLinkHandler', () => {
    let showToasterSpy: jest.SpyInstance;

    beforeEach(() => {
      showToasterSpy = jest.spyOn(toaster, 'showToaster');
    });

    it('should process errors as expected: no errors', () => {
      const errorRes = <ErrorResponse>{
        graphQLErrors: void 0,
        networkError: void 0,
      };
      service.gqlErrorLinkHandler(errorRes);
      expect(showToasterSpy).toHaveBeenCalledWith('Graphql request error', 'error');
    });

    it('should process errors as expected: graphQLErrors', () => {
      const testErrorNoCode = <GraphQLError>{
        message: 'gql error 1',
      };
      const testError = <GraphQLError>{
        message: 'gql error 2',
        extensions: <GraphQLError['extensions']>{
          code: '400',
        },
      };
      const errorRes = <ErrorResponse>{
        graphQLErrors: <GraphQLErrors>[testErrorNoCode, testError],
        networkError: void 0,
      };
      service.gqlErrorLinkHandler(errorRes);
      const expectedMessage = `[GraphQL error ${testErrorNoCode.extensions?.code}]: ${testErrorNoCode.message}[GraphQL error ${testError.extensions.code}]: ${testError.message}`;
      expect(showToasterSpy).toHaveBeenCalledWith(expectedMessage, 'error');
    });

    it('should process errors as expected: networkError', () => {
      const networkError: NetworkError = {
        bodyText: '',
        message: '',
        name: '',
        response: <Response>{
          body: null,
          bodyUsed: false,
          headers: {},
          ok: false,
          status: 400,
          statusText: 'err',
          type: 'error',
          url: 'https://test',
        },
        result: {},
        statusCode: 400,
      };
      const errorRes = <ErrorResponse>{
        graphQLErrors: void 0,
        networkError,
      };
      service.gqlErrorLinkHandler(errorRes);
      const err = <(ServerParseError & ServerError) | null>networkError;
      const expectedMessage = `[Network error ${err?.statusCode}]: ${err?.message}`;
      expect(showToasterSpy).toHaveBeenCalledWith(expectedMessage, 'error');
    });
  });

  it('checkErrorStatusAndRedirect should reset user if error status is 401', () => {
    const showToasterSpy = jest.spyOn(toaster, 'showToaster');
    service.checkErrorStatusAndRedirect(HTTP_STATUS.BAD_REQUEST);
    expect(routerNavigateSpy).not.toHaveBeenCalled();
    expect(showToasterSpy).not.toHaveBeenCalledWith(expect.any(String), 'error');
    service.checkErrorStatusAndRedirect(HTTP_STATUS.UNAUTHORIZED);
    expect(routerNavigateSpy).toHaveBeenCalled();
    expect(showToasterSpy).toHaveBeenCalledWith(expect.any(String), 'error');
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

  it('createGqlLink should return the newtork link observable', waitForAsync(() => {
    const getEndpointSpy = jest.spyOn(service, 'getEndpoint');
    const gqlUriFunctionSpy = jest.spyOn(service, 'gqlUriFunction');
    const gqlLinkSplitTestSpy = jest.spyOn(service, 'gqlLinkSplitTest');
    const link = service.createGqlLink('testToken');
    expect(link instanceof ApolloLink).toBeTruthy();
    expect(getEndpointSpy).toHaveBeenCalledTimes(1);
    expect(gqlUriFunctionSpy).toHaveBeenCalledTimes(1);
    expect(gqlLinkSplitTestSpy).toHaveBeenCalledTimes(1);
  }));

  it('gqlUriFunction should return expected URI function', () => {
    const uri = 'https://test';
    const uriFn = service.gqlUriFunction(uri);
    const operation = <Operation>{
      operationName: 'test',
    };
    const result = uriFn(operation);
    expect(result).toEqual(`${uri}?operation=${operation.operationName}`);
  });

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
            expect(storeDispatchSpy).toHaveBeenCalledWith(httpProgressActions.start({ payload: { mainView: true } }));
          }),
          finalize(() => {
            expect(storeDispatchSpy).toHaveBeenCalledWith(httpProgressActions.stop({ payload: { mainView: true } }));
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
            expect(storeDispatchSpy).toHaveBeenCalledWith(httpProgressActions.start({ payload: { mainView: true } }));
          }),
        )
        .subscribe();
    }));
  });
});

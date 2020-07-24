import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { async, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { AppSharedServicesModule, AppToasterService } from '@nx-ng-starter/client-services';
import { AppHttpProgressModule, AppUserService } from '@nx-ng-starter/client-store/state';
import { AppSharedUiTranslateModule } from '@nx-ng-starter/client-ui-translate';
import { HTTP_STATUS } from '@nx-ng-starter/client-util';
import {
  AppLocalStorageMock,
  getTestBedConfig,
  newTestBedMetadata,
} from '@nx-ng-starter/mocks-core';
import { Apollo } from 'apollo-angular';
import { ExecutionResult } from 'apollo-link';
import { GraphQLError } from 'graphql';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import { AppHttpHandlersService } from './http-handlers.service';

describe('AppHttpHandlersService', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [
      AppSharedUiTranslateModule.forRoot(),
      AppHttpProgressModule.forRoot(),
      AppSharedServicesModule.forRoot(),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let service: AppHttpHandlersService;
  let apollo: Apollo;
  let httpTestingController: HttpTestingController;
  let localStorage: AppLocalStorageMock;
  let toaster: AppToasterService;
  let user: AppUserService;
  let spy: {
    user: {
      handlers: {
        setState: jest.SpyInstance;
      };
    };
    service: {
      checkErrorStatusAndRedirect: jest.SpyInstance;
    };
  };

  beforeEach(async(() => {
    localStorage = window.localStorage;
    jest.spyOn(localStorage, 'setItem');

    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        service = TestBed.inject(AppHttpHandlersService);
        toaster = TestBed.inject(AppToasterService);
        httpTestingController = TestBed.inject(HttpTestingController);
        apollo = TestBed.inject(Apollo);
        user = TestBed.inject(AppUserService);
        spy = {
          user: {
            handlers: {
              setState: jest.spyOn(user.handlers, 'setState'),
            },
          },
          service: {
            checkErrorStatusAndRedirect: jest.spyOn(service, 'checkErrorStatusAndRedirect'),
          },
        };
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
    expect(service.isLocalhost).toEqual(expect.any(Function));
    expect(service.graphQlEndpoint).toEqual(expect.any(Function));
    expect(service.getGraphQLHttpHeaders).toEqual(expect.any(Function));
    expect(service.getEndpoint).toEqual(expect.any(Function));
    expect(service.extractGraphQLData).toEqual(expect.any(Function));
    expect(service.checkErrorStatusAndRedirect).toEqual(expect.any(Function));
    expect(service.handleError).toEqual(expect.any(Function));
    expect(service.handleGraphQLError).toEqual(expect.any(Function));
    expect(service.pipeHttpResponse).toEqual(expect.any(Function));
    expect(service.pipeGraphQLRequest).toEqual(expect.any(Function));
    expect(service.tapProgress).toEqual(expect.any(Function));
    expect(service.tapError).toEqual(expect.any(Function));
    expect(service.createApolloLinkFor).toEqual(expect.any(Function));
  });

  describe('extractGraphQLData', () => {
    it('should return an Array', async(() => {
      const executionResult: ExecutionResult = {
        data: [{ x: 'x' }, { y: 'y' }],
      };
      expect(service.extractGraphQLData(executionResult)).toEqual(expect.any(Array));
      expect(service.extractGraphQLData(executionResult)).toEqual(executionResult.data);
    }));

    it('should return execution result if response does not contain nested data object', async(() => {
      const executionResult: ExecutionResult = {};
      expect(service.extractGraphQLData(executionResult)).toEqual(expect.any(Object));
      expect(service.extractGraphQLData(executionResult)).toEqual(executionResult);
    }));
  });

  it('extractGraphQLData should throw errors if get', () => {
    const error: GraphQLError = new GraphQLError('message');
    try {
      service.extractGraphQLData({ errors: [error] });
    } catch (e) {
      const errors = e as GraphQLError[];
      expect(errors[0]).toBe(error);
    }
  });

  it('pipeGraphQLRequest should check error if 401 status', async(() => {
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
  }));

  it('checkErrorStatusAndRedirect should reset user if error status is 401', () => {
    service.checkErrorStatusAndRedirect(HTTP_STATUS.BAD_REQUEST);
    expect(spy.user.handlers.setState).not.toHaveBeenCalledWith({ token: '' });
    service.checkErrorStatusAndRedirect(HTTP_STATUS.UNAUTHORIZED);
    expect(spy.user.handlers.setState).toHaveBeenCalledWith({ token: '' });
  });

  describe('handleError', () => {
    it('should handle errors properly #1', async(() => {
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
    }));

    it('should handle errors properly #2', async(() => {
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
    }));
  });

  describe('handleGraphQLError', () => {
    it('should return an Observable', () => {
      expect(service['handleGraphQLError']('err')).toEqual(expect.any(Observable));
    });
  });

  describe('isLocalhost', () => {
    it('should resolve if application is requested from localhost over http', () => {
      expect(service.isLocalhost()).toBeTruthy();
    });
  });

  it('graphQLHttpHeaders should return new http headers with authorization header set', () => {
    const newHeadersObj: {
      [name: string]: string | string[];
    } = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Token ${service.userToken}`,
    };
    const newHeaders: HttpHeaders = new HttpHeaders(newHeadersObj);
    expect(service.getGraphQLHttpHeaders().get('Authorization')).toEqual(
      newHeaders.get('Authorization'),
    );
  });

  it('pipeHttpResponse should work correctly', () => {
    const observable = of({ data: {} });
    let pipedRequest = service.pipeHttpResponse(observable);
    expect(pipedRequest).toEqual(expect.any(Observable));
    pipedRequest = service.pipeHttpResponse(observable, 1);
  });
});

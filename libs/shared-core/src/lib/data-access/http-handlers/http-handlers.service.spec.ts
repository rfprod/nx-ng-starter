import { TestBed, async } from '@angular/core/testing';

import { HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';

import { LocalStorageMock, httpHandlersProviders } from '@nx-ng-starter/mocks-core';

import {
  AppTranslateModule,
  HttpProgressModule,
  UserService,
  httpProgressModuleProviders,
} from '@nx-ng-starter/shared-core/ui';

import { CustomMaterialModule } from '../../ui/index';

import { GraphQLError } from 'graphql';

import { cold, getTestScheduler } from 'jasmine-marbles';

import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { ExecutionResult } from 'apollo-link';

import { ToasterService } from '../toaster/toaster.service';

import { HttpHandlersService } from './http-handlers.service';

import { Observable, of } from 'rxjs';

import { HttpErrorCodes } from '../interfaces';
import { HttpSuccessCodes } from '../interfaces/http-handlers/http-handlers.interface';

describe('HttpHandlersService', () => {
  let service: HttpHandlersService | any;
  let apollo: Apollo;
  let httpTestingController: HttpTestingController;
  let localStorage: LocalStorageMock;
  let toaster: ToasterService;
  let user: UserService | any;
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
    Object.defineProperty(window, 'localStorage', {
      value: new LocalStorageMock(),
      writable: true,
    });
    localStorage = window.localStorage;
    jest.spyOn(localStorage, 'setItem');

    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientTestingModule,
        CustomMaterialModule,
        AppTranslateModule,
        ApolloModule,
        HttpLinkModule,
        NgxsModule.forRoot([], { developmentMode: true }),
        NgxsLoggerPluginModule.forRoot({ disabled: true, collapsed: true }),
        NgxsFormPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        HttpProgressModule.forRoot(),
      ],
      providers: [...httpHandlersProviders, ...httpProgressModuleProviders],
    })
      .compileComponents()
      .then(() => {
        service = TestBed.get(HttpHandlersService) as HttpHandlersService;
        toaster = TestBed.get(ToasterService) as ToasterService;
        httpTestingController = TestBed.get(HttpTestingController);
        apollo = TestBed.get(Apollo) as Apollo;
        user = TestBed.get(UserService) as UserService;
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
      .match((req: HttpRequest<any>): boolean => true)
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
    expect(service.api).toEqual(expect.any(String));
    expect(service.isLocalhost).toEqual(expect.any(Function));
    expect(service.graphQlEndpoint).toEqual(expect.any(Function));
    expect(service.getGraphQLHttpHeaders).toEqual(expect.any(Function));
    expect(service.getEndpoint).toEqual(expect.any(Function));
    expect(service.extractObject).toEqual(expect.any(Function));
    expect(service.extractArray).toEqual(expect.any(Function));
    expect(service.extractGraphQLData).toEqual(expect.any(Function));
    expect(service.checkErrorStatusAndRedirect).toEqual(expect.any(Function));
    expect(service.handleError).toEqual(expect.any(Function));
    expect(service['handleGraphQLError']).toEqual(expect.any(Function));
    expect(service.pipeRequestWithObjectResponse).toEqual(expect.any(Function));
    expect(service.pipeRequestWithArrayResponse).toEqual(expect.any(Function));
    expect(service.pipeGraphQLRequest).toEqual(expect.any(Function));
    expect(service.tapProgress).toEqual(expect.any(Function));
    expect(service.tapError).toEqual(expect.any(Function));
    expect(service.createApolloLinkFor).toEqual(expect.any(Function));
  });

  describe('extractObject', () => {
    it('should return an Object if response is provided', () => {
      expect(
        service.extractObject(
          new HttpResponse<any>({ body: {}, status: HttpSuccessCodes.SUCCESS }),
        ),
      ).toEqual(expect.any(Object));
    });

    it('should return an Object if res.json() returns falsy value', () => {
      const res: { json?(): any } = new Object({});
      res.json = () => null;
      expect(service.extractObject(res)).toEqual(expect.any(Object));
    });

    it('should return an empty Object if no data is present', () => {
      expect(service.extractObject(null)).toEqual(expect.any(Object));
    });

    it('should return response if it does not have json method', () => {
      expect(service.extractObject({})).toEqual(expect.any(Object));
    });
  });

  describe('extractArray', () => {
    it('extractArray should return an Array if response is provided', () => {
      expect(
        service.extractArray(
          new HttpResponse<any>({
            body: { data: [{ x: 'x' }, { y: 'y' }] },
            status: HttpSuccessCodes.SUCCESS,
            headers: new HttpHeaders({}),
          }),
        ),
      ).toEqual(expect.any(Array));
    });

    it('should return an Array if res.json() returns falsy value', () => {
      const res: { json?(): any } = new Object({});
      res.json = () => new Object({ data: null });
      expect(service.extractArray(res)).toEqual(expect.any(Array));
    });

    it('should return an Array if res.json() returns falsy value and res does not contain data key', () => {
      const res: { json?(): any } = new Object({});
      res.json = null;
      expect(service.extractArray(res)).toEqual(expect.any(Array));
    });

    it('should return response if it does not have json method', () => {
      expect(service.extractArray({ data: [] })).toEqual(expect.any(Array));
    });

    it('extractArray should return an empty Array if no data is present', () => {
      expect(service.extractArray(null)).toEqual(expect.any(Array));
    });
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
      expect(e[0]).toBe(error);
    }
  });

  it('pipeGraphQLRequest should check error if 401 status', async(() => {
    const q$ = cold('---#|', null, { networkError: { status: HttpErrorCodes.BAD_REQUEST } });
    service.pipeGraphQLRequest(q$).subscribe(
      (data: any) => {
        console.log('pipeGraphQLRequest, data should not be called', data);
      },
      (error: any) => {
        console.log('pipeGraphQLRequest, error', error);
        expect(spy.service.checkErrorStatusAndRedirect).toHaveBeenCalledWith(
          HttpErrorCodes.UNAUTHORIZED,
        );
      },
    );
    getTestScheduler().flush();
  }));

  it('checkErrorStatusAndRedirect should reset user if error status is 401', () => {
    service.checkErrorStatusAndRedirect(HttpErrorCodes.BAD_REQUEST);
    expect(spy.user.handlers.setState).not.toHaveBeenCalledWith({ token: '' });
    service.checkErrorStatusAndRedirect(HttpErrorCodes.UNAUTHORIZED);
    expect(spy.user.handlers.setState).toHaveBeenCalledWith({ token: '' });
  });

  describe('handleError', () => {
    it('should return an Observable', () => {
      expect(service.handleError({ errors: [{ detail: 'error' }] })).toEqual(
        expect.any(Observable),
      );
    });

    it('should return an Observable with nested error structure', () => {
      expect(service.handleError({ errors: [{ detail: { err1: 'err1' } }] })).toEqual(
        expect.any(Observable),
      );
    });

    it('should handle errors properly', async(() => {
      service
        .handleError({
          _body: JSON.stringify({
            code: 'errorType',
            message: 'errorMessage',
            detail: {
              root_erratic_item: {
                erratic_item: ['error msg 1', 'error msg 2'],
              },
            },
          }),
        })
        .toPromise()
        .then(
          () => true,
          (error: string) =>
            expect(error).toEqual(
              'errorType - errorMessage: erratic_item - error msg 1, error msg 2',
            ),
        );

      service
        .handleError({
          _body: JSON.stringify({
            code: 'errorType',
            message: 'errorMessage',
            detail: {
              root_erratic_item: {
                erratic_item: ['error msg 1', 'error msg 2'],
              },
              erratic_item2: null,
            },
          }),
        })
        .toPromise()
        .then(
          () => true,
          (error: string) =>
            expect(error).toEqual(
              'errorType - errorMessage: erratic_item - error msg 1, error msg 2',
            ),
        );

      service
        .handleError({
          status: '400',
          statusText: 'error status text',
          _body: JSON.stringify(null),
        })
        .toPromise()
        .then(() => true, (error: string) => expect(error).toEqual('400 - error status text'));

      service
        .handleError({ _body: JSON.stringify(null) })
        .toPromise()
        .then(() => true, (error: string) => expect(error).toEqual('Server error'));

      // Optional error response handling
      service
        .handleError({
          _body: JSON.stringify({
            errors: [{ code: 'err_code', detail: 'error body' }],
          }),
        })
        .toPromise()
        .then(() => true, (error: string) => expect(error).toEqual('err_code - error body'));

      service
        .handleError({ errors: [{ code: 'err_code', detail: 'error body' }] })
        .toPromise()
        .then(() => true, (error: string) => expect(error).toEqual('err_code - error body'));

      service
        .handleError({
          errors: [],
          status: '400',
          statusText: 'error status text',
        })
        .toPromise()
        .then(() => true, (error: string) => expect(error).toEqual('400 - error status text'));

      service
        .handleError({
          _body: JSON.stringify({
            code: 'errorType',
            message: 'general message',
          }),
        })
        .toPromise()
        .then(
          () => true,
          (error: string) => expect(error).toEqual('errorType - general message'),
        );

      service
        .handleError({ code: 'errorType', message: 'general message' })
        .toPromise()
        .then(
          () => true,
          (error: string) => expect(error).toEqual('errorType - general message'),
        );

      service
        .handleError({
          code: 'errorType',
          message: 'general message',
          detail: { inn: ['invalidValue'] },
        })
        .toPromise()
        .then(
          () => true,
          (error: string) =>
            expect(error).toEqual('errorType - general message: inn - invalidValue'),
        );

      service
        .handleError({
          code: 'errorType',
          message: 'general message',
          detail: { inn: ['invalidValue1', 'invalidValue2'] },
        })
        .toPromise()
        .then(
          () => true,
          (error: string) =>
            expect(error).toEqual(
              'errorType - general message: inn - invalidValue1, invalidValue2',
            ),
        );

      service
        .handleError({
          _body: JSON.stringify({}),
          status: '400',
          statusText: 'error status text',
        })
        .toPromise()
        .then(() => true, (error: string) => expect(error).toEqual('400 - error status text'));

      service
        .handleError({ status: '400', statusText: 'error status text' })
        .toPromise()
        .then(() => true, (error: string) => expect(error).toEqual('400 - error status text'));

      service
        .handleError({})
        .toPromise()
        .then(() => true, (error: string) => expect(error).toEqual('Server error'));
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
    const newHeadersObj: any = {
      Authorization: `Token ${user.userToken}`,
    };
    const newHeaders: HttpHeaders = new HttpHeaders(newHeadersObj);
    expect(service.getGraphQLHttpHeaders().get('Authorization')).toEqual(
      newHeaders.get('Authorization'),
    );
  });

  it('pipeRequestWithObjectResponse should work correctly', () => {
    const observable = of({ data: {} });
    let pipedRequest = service.pipeRequestWithObjectResponse(observable);
    expect(pipedRequest).toEqual(expect.any(Observable));
    pipedRequest = service.pipeRequestWithObjectResponse(observable, 1);
  });

  it('pipeRequestWithArrayResponse should work correctly', () => {
    const observable = of({ data: [] });
    let pipedRequest = service.pipeRequestWithArrayResponse(observable);
    expect(pipedRequest).toEqual(expect.any(Observable));
    pipedRequest = service.pipeRequestWithArrayResponse(observable, 1);
  });
});

import { TestBed, async } from '@angular/core/testing';

import { Response, ResponseOptions, Headers } from '@angular/http';

import { HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { UserService } from '../user/user.service';

import {
  LocalStorageMock,
  httpHandlersProvider
} from '@nx-ng-starter/mocks-core';

import {
  AppTranslateModule
} from '@nx-ng-starter/shared-core/ui';

import { CustomMaterialModule } from '../../ui/index';

import { GraphQLError } from 'graphql';

import { cold, getTestScheduler } from 'jasmine-marbles';

import { Apollo, ApolloModule } from 'apollo-angular';
import { ExecutionResult } from 'apollo-link';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ToasterService } from '../toaster/toaster.service';

import { HttpHandlersService } from './http-handlers.service';

import { Observable, of } from 'rxjs';
import { skip, take } from 'rxjs/operators';

describe('HttpHandlersService', () => {
  let service: HttpHandlersService|any;
  let apollo: Apollo;
  let httpTestingController: HttpTestingController;
  let localStorage: LocalStorageMock;
  let toaster: ToasterService;
  let win: Window;
  let user: UserService;
  let spy: any;

  beforeEach(async(() => {
    Object.defineProperty(window, 'localStorage', {
      value: new LocalStorageMock(),
      writable: true
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
        HttpLinkModule
      ],
      providers: [...httpHandlersProvider],
      schemas: []
    })
      .compileComponents()
      .then(() => {
        service = TestBed.get(
          HttpHandlersService
        ) as HttpHandlersService;
        toaster = TestBed.get(ToasterService) as ToasterService;
        httpTestingController = TestBed.get(HttpTestingController);
        apollo = TestBed.get(Apollo) as Apollo;
        win = TestBed.get('Window') as Window;
        user = TestBed.get(UserService) as UserService;

        spy = {
          user: {
            saveUser: jest.spyOn(user, 'saveUser')
          },
          service: {
            checkErrorStatusAndRedirect: jest.spyOn(
              service,
              'checkErrorStatusAndRedirect'
            )
          }
        };
      });
  }));

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have variables and methods defined', () => {
    expect(service['mockMode$']).toBeDefined();
    expect(service.mockMode).toBeDefined();
    expect(service.defaultHttpTimeout).toEqual(expect.any(Number));
    expect(service.isLocalhost).toEqual(expect.any(Function));
    expect(service.toggleMockMode).toEqual(expect.any(Function));
    expect(service['apiDomain']).toEqual(expect.any(String));
    expect(service.apiBaseUrl).toEqual(expect.any(Function));
    expect(service.graphQlEndpoint).toEqual(expect.any(Function));
    expect(service.getGraphQLHttpHeaders).toEqual(expect.any(Function));
    expect(service.getEndpoint).toEqual(expect.any(Function));
    expect(service.extractObject).toEqual(expect.any(Function));
    expect(service.extractArray).toEqual(expect.any(Function));
    expect(service.extractHttpResponse).toEqual(expect.any(Function));
    expect(service.extractGraphQLData).toEqual(expect.any(Function));
    expect(service.checkErrorStatusAndRedirect).toEqual(expect.any(Function));
    expect(service.handleError).toEqual(expect.any(Function));
    expect(service['handleGraphQLError']).toEqual(expect.any(Function));
    expect(service.pipeRequestWithObjectResponse).toEqual(expect.any(Function));
    expect(service.pipeRequestWithArrayResponse).toEqual(expect.any(Function));
    expect(service.pipeGraphQLRequest).toEqual(expect.any(Function));
    expect(service['spinnerTap']).toEqual(expect.any(Function));
    expect(service.createApolloLinkFor).toEqual(expect.any(Function));
  });

  describe('extractObject', () => {
    it('should return an Object if response is provided', () => {
      expect(
        service.extractObject(
          new Response(new ResponseOptions({ body: {}, status: 200 }))
        )
      ).toEqual(expect.any(Object));
    });

    it('should return an Object if res.json() returns falsy value', () => {
      const res: { json?: () => any } = new Object({});
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
          new Response(
            new ResponseOptions({
              body: { data: [{ x: 'x' }, { y: 'y' }] },
              status: 200,
              headers: new Headers({})
            })
          )
        )
      ).toEqual(expect.any(Array));
    });

    it('should return an Array if res.json() returns falsy value', () => {
      const res: { json?: () => any } = new Object({});
      res.json = () => new Object({ data: null });
      expect(service.extractArray(res)).toEqual(expect.any(Array));
    });

    it('should return an Array if res.json() returns falsy value and res does not contain data key', () => {
      const res: { json?: () => any } = new Object({});
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

  it('extractHttpResponse should return an Array', () => {
    expect(
      service.extractHttpResponse(
        new HttpResponse({
          body: { data: [{ x: 'x' }, { y: 'y' }] },
          status: 200
        })
      )
    ).toEqual(expect.any(Object));
  });

  describe('extractGraphQLData', () => {
    it('should return an Array', async(() => {
      const executionResult: ExecutionResult = {
        data: [{ x: 'x' }, { y: 'y' }]
      };
      expect(service.extractGraphQLData(executionResult)).toEqual(
        expect.any(Array)
      );
      expect(service.extractGraphQLData(executionResult)).toEqual(
        executionResult.data
      );
    }));

    it('should return execution result if response does not contain nested data object', async(() => {
      const executionResult: ExecutionResult = {};
      expect(service.extractGraphQLData(executionResult)).toEqual(
        expect.any(Object)
      );
      expect(service.extractGraphQLData(executionResult)).toEqual(
        executionResult
      );
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
    const q$ = cold('---#|', null, { networkError: { status: 401 } });
    service
      .pipeGraphQLRequest(q$)
      .pipe(take(1))
      .subscribe(
        (data: any) => {
          console.log('pipeGraphQLRequest, data should not be called', data);
        },
        (error: any) => {
          console.log('pipeGraphQLRequest, error', error);
          expect(spy.service.checkErrorStatusAndRedirect).toHaveBeenCalledWith(
            401
          );
        }
      );
    getTestScheduler().flush();
  }));

  it('checkErrorStatusAndRedirect should reset user if error status is 401', () => {
    service.checkErrorStatusAndRedirect(400);
    expect(spy.user.saveUser).not.toHaveBeenCalledWith({ token: '' });
    service.checkErrorStatusAndRedirect(401);
    expect(spy.user.saveUser).toHaveBeenCalledWith({ token: '' });
  });

  describe('handleError', () => {
    it('should return an Observable', () => {
      expect(service.handleError({ errors: [{ detail: 'error' }] })).toEqual(
        expect.any(Observable)
      );
    });

    it('should return an Observable with nested error structure', () => {
      expect(
        service.handleError({ errors: [{ detail: { err1: 'err1' } }] })
      ).toEqual(expect.any(Observable));
    });

    it('should handle errors properly', async () => {
      // this is returned by real backend by the moment
      await service
        .handleError({
          _body: JSON.stringify({
            code: 'errorType',
            message: 'errorMessage',
            detail: {
              root_erratic_item: {
                erratic_item: ['error msg 1', 'error msg 2']
              }
            }
          })
        })
        .subscribe(
          () => true,
          (error: string) =>
            expect(error).toEqual(
              'errorType - errorMessage: erratic_item - error msg 1, error msg 2'
            )
        );
      await service
        .handleError({
          _body: JSON.stringify({
            code: 'errorType',
            message: 'errorMessage',
            detail: {
              root_erratic_item: {
                erratic_item: ['error msg 1', 'error msg 2']
              },
              erratic_item2: null
            }
          })
        })
        .subscribe(
          () => true,
          (error: string) =>
            expect(error).toEqual(
              'errorType - errorMessage: erratic_item - error msg 1, error msg 2'
            )
        );
      await service
        .handleError({
          status: '400',
          statusText: 'error status text',
          _body: JSON.stringify(null)
        })
        .subscribe(
          () => true,
          (error: string) => expect(error).toEqual('400 - error status text')
        );
      await service
        .handleError({ _body: JSON.stringify(null) })
        .subscribe(
          () => true,
          (error: string) => expect(error).toEqual('Server error')
        );

      // optional error response handling
      await service
        .handleError({
          _body: JSON.stringify({
            errors: [{ code: 'err_code', detail: 'error body' }]
          })
        })
        .subscribe(
          () => true,
          (error: string) => expect(error).toEqual('err_code - error body')
        );
      await service
        .handleError({ errors: [{ code: 'err_code', detail: 'error body' }] })
        .subscribe(
          () => true,
          (error: string) => expect(error).toEqual('err_code - error body')
        );
      await service
        .handleError({
          errors: [],
          status: '400',
          statusText: 'error status text'
        })
        .subscribe(
          () => true,
          (error: string) => expect(error).toEqual('400 - error status text')
        );
      await service
        .handleError({
          _body: JSON.stringify({
            code: 'errorType',
            message: 'general message'
          })
        })
        .subscribe(
          () => true,
          (error: string) =>
            expect(error).toEqual('errorType - general message')
        );
      await service
        .handleError({ code: 'errorType', message: 'general message' })
        .subscribe(
          () => true,
          (error: string) =>
            expect(error).toEqual('errorType - general message')
        );
      await service
        .handleError({
          code: 'errorType',
          message: 'general message',
          detail: { inn: ['invalidValue'] }
        })
        .subscribe(
          () => true,
          (error: string) =>
            expect(error).toEqual(
              'errorType - general message: inn - invalidValue'
            )
        );
      await service
        .handleError({
          code: 'errorType',
          message: 'general message',
          detail: { inn: ['invalidValue1', 'invalidValue2'] }
        })
        .subscribe(
          () => true,
          (error: string) =>
            expect(error).toEqual(
              'errorType - general message: inn - invalidValue1, invalidValue2'
            )
        );
      await service
        .handleError({
          _body: JSON.stringify({}),
          status: '400',
          statusText: 'error status text'
        })
        .subscribe(
          () => true,
          (error: string) => expect(error).toEqual('400 - error status text')
        );
      await service
        .handleError({ status: '400', statusText: 'error status text' })
        .subscribe(
          () => true,
          (error: string) => expect(error).toEqual('400 - error status text')
        );
      await service
        .handleError({})
        .subscribe(
          () => true,
          (error: string) => expect(error).toEqual('Server error')
        );
    });
  });

  describe('handleGraphQLError', () => {
    it('should return an Observable', () => {
      expect(service['handleGraphQLError']('err')).toEqual(
        expect.any(Observable)
      );
    });
  });

  describe('isLocalhost', () => {
    it('should resolve if application is requested from localhost over http', () => {
      expect(service.isLocalhost()).toBeTruthy();
    });
  });

  describe('toggleMockMode', () => {
    let localStorage;
    beforeEach(() => {
      localStorage = window.localStorage;
      localStorage.setItem('mock', true);
    });

    it('should emit new mock value if mode is provided', async(() => {
      service.mockMode.subscribe(result => expect(result).toEqual(true));
      service.toggleMockMode(true);
    }));

    it('should emit new mock value if mode is not provided', async(() => {
      expect(service['mockMode$'].value).toEqual(true);
      service.toggleMockMode();
      service.mockMode.subscribe(result => expect(result).toEqual(false));
    }));

    it('should write in localStorage', async(() => {
      service.mockMode
        .pipe(skip(2))
        .subscribe(() =>
          expect(localStorage.setItem).toHaveBeenCalledWith(true)
        );
      service.toggleMockMode(true);
    }));
  });

  it('apiBaseUrl should return mock server path if mockMode is true', async(() => {
    const mockServerPath: string = win.location.origin;
    expect(service['mockMode$'].value).toEqual(true);
    expect(service.apiBaseUrl()).toEqual(mockServerPath);
  }));

  it('apiBaseUrl should return real server path if mockMode is false', async(() => {
    const realServerPath = `${win.location.protocol}//${service['apiDomain']}`;
    service.toggleMockMode(false);
    expect(service['mockMode$'].value).toEqual(false);
    expect(service.apiBaseUrl()).toEqual(realServerPath);
  }));

  it('toggleMockMode should emit new mock value if mode is provided', async(() => {
    service.mockMode.subscribe(result => expect(result).toEqual(true));
    service.toggleMockMode(true);
  }));

  it('graphQlEndpoint should work correctly', () => {
    service.toggleMockMode(false);
    expect(service.graphQlEndpoint(null)).not.toMatch(service['apiDomain']);

    service.toggleMockMode(true);
    expect(service.graphQlEndpoint(null)).not.toMatch(service['apiDomain']);

    service.toggleMockMode(false);
    expect(service.graphQlEndpoint('carrier')).toMatch(service['apiDomain']);

    service.toggleMockMode(false);
    expect(service.graphQlEndpoint('owner')).toMatch(service['apiDomain']);
  });

  it('graphQLHttpHeaders should return new http headers with authorization header set', () => {
    const newHeadersObj: any = {
      Authorization: `Token ${user.getUser().token}`
    };
    const newHeaders: HttpHeaders = new HttpHeaders(newHeadersObj);
    expect(service.getGraphQLHttpHeaders().get('Authorization')).toEqual(
      newHeaders.get('Authorization')
    );
  });

  it('getEndpoint should return path correctly', () => {
    let path = '/path';
    expect(service.getEndpoint(path)).toEqual(service.apiBaseUrl() + path);
    path = 'path';
    expect(service.getEndpoint(path)).toEqual(
      service.apiBaseUrl() + `/${path}`
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

  describe('createApolloLinkFor', () => {
    describe('with error link', () => {
      let queryObservable: Observable<any>;
      let req;
      const setreq = () => {
        req = httpTestingController.expectOne((req: HttpRequest<any>) =>
          /carrier/.test(req.url)
        );
      };

      beforeEach(() => {
        const options = {
          link: service.createApolloLinkFor('carrier'),
          cache: new InMemoryCache({ resultCaching: false })
        };

        apollo.create(options, 'root');
        queryObservable = apollo.use('root').watchQuery({
          query: GRAPHQL_QUERY.CARRIER.GET_PROFILE,
          variables: {},
          fetchPolicy: 'no-cache'
        }).valueChanges;
      });

      it('should show toaster', async(() => {
        const toasterShow = jest.spyOn(toaster, 'showToaster');
        queryObservable.subscribe({
          error: () => {
            expect(toasterShow).toHaveBeenCalled();
          }
        });
        setreq();
        req.flush('error', { status: 500, statusText: 'Error' });
      }));

      it('should show proper if graphQLErrors', async(() => {
        const toasterShow = jest.spyOn(toaster, 'showToaster');
        queryObservable.subscribe({
          error: () => {
            const params =
              toasterShow.mock.calls[toasterShow.mock.calls.length - 1];
            expect(/GraphQL/.test(params[0])).toBeTruthy();
          }
        });
        setreq();
        req.flush(
          {
            errors: [
              {
                message: 'forbidden',
                locations: [],
                path: ['protectedAction'],
                extensions: {
                  code: 'UNAUTHENTICATED'
                }
              }
            ]
          },
          { status: 200, statusText: 'OK' }
        );
      }));
    });
  });
});

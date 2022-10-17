import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { AppHttpHandlersService } from '@app/client-store-http-progress';
import { flushHttpRequests, getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { of, tap } from 'rxjs';

import { AppHttpApiService } from './http-api.service';

describe('AppHttpApiService', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [HttpClientTestingModule],
    providers: [
      AppHttpApiService,
      {
        provide: AppHttpHandlersService,
        useValue: {
          getEndpoint: (endpoint: string) => {
            const endpoints = {
              auth: 'http://auth',
            };
            return endpoints[endpoint];
          },
          pipeHttpResponse: () => of(null),
        },
      },
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let service: AppHttpApiService;
  let httpHandlers: AppHttpHandlersService;
  let httpHandlersSpy: {
    getEndpoint: jest.SpyInstance;
    pipeHttpResponse: jest.SpyInstance;
  };

  let httpClient: HttpClient;
  let httpClientGetSpy: jest.SpyInstance;

  let httpController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        httpController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(AppHttpApiService);
        httpHandlers = TestBed.inject(AppHttpHandlersService);
        httpHandlersSpy = {
          getEndpoint: jest.spyOn(httpHandlers, 'getEndpoint'),
          pipeHttpResponse: jest.spyOn(httpHandlers, 'pipeHttpResponse'),
        };
        httpClient = TestBed.inject(HttpClient);
        httpClientGetSpy = jest.spyOn(httpClient, 'get');
      });
  }));

  afterEach(() => {
    flushHttpRequests(httpController, true);
  });

  it('the ping method should work as expected', waitForAsync(() => {
    void service
      .ping()
      .pipe(
        tap(() => {
          expect(httpHandlersSpy.getEndpoint).toHaveBeenCalledWith('auth');
          expect(httpClientGetSpy).toHaveBeenCalledWith('http://auth');
          expect(httpHandlersSpy.pipeHttpResponse).toHaveBeenCalledTimes(1);
        }),
      )
      .subscribe();
  }));
});

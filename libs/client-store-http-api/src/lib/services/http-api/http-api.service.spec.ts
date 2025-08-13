import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { AppHttpHandlersService } from '@app/client-store-http-progress';
import { flushHttpRequests, getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { lastValueFrom, of } from 'rxjs';
import type { MockInstance } from 'vitest';

import { AppHttpApiService } from './http-api.service';

describe('AppHttpApiService', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    providers: [
      {
        provide: AppHttpHandlersService,
        useValue: {
          getEndpoint: (endpoint: string) => {
            const endpoints = {
              auth: 'http://auth',
            };
            return endpoints[endpoint as keyof typeof endpoints];
          },
          pipeHttpResponse: () => of(null),
        },
      },
      AppHttpApiService,
      provideHttpClientTesting(),
      provideHttpClient(),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let service: AppHttpApiService;
  let httpHandlers: AppHttpHandlersService;
  let httpHandlersSpy: {
    getEndpoint: MockInstance;
    pipeHttpResponse: MockInstance;
  };

  let httpClient: HttpClient;
  let httpClientGetSpy: MockInstance;

  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AppHttpApiService);
    httpHandlers = TestBed.inject(AppHttpHandlersService);
    httpHandlersSpy = {
      getEndpoint: vi.spyOn(httpHandlers, 'getEndpoint'),
      pipeHttpResponse: vi.spyOn(httpHandlers, 'pipeHttpResponse'),
    };
    httpClient = TestBed.inject(HttpClient);
    httpClientGetSpy = vi.spyOn(httpClient, 'get');
  });

  afterEach(() => {
    flushHttpRequests(httpController, true);
  });

  it('the ping method should work as expected', async () => {
    await lastValueFrom(service.ping());
    expect(httpHandlersSpy.getEndpoint).toHaveBeenCalledWith('auth');
    expect(httpClientGetSpy).toHaveBeenCalledWith('http://auth');
    expect(httpHandlersSpy.pipeHttpResponse).toHaveBeenCalledTimes(1);
  });
});

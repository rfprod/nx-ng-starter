import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { AppHttpHandlersService } from '@app/client-store-http-progress';
import { flushHttpRequests, getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { lastValueFrom, of } from 'rxjs';
import type { MockInstance } from 'vitest';

import { AppStaticDataService } from './static-data-api.service';

describe('AppStaticDataService', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    providers: [
      AppStaticDataService,
      {
        provide: AppHttpHandlersService,
        useValue: {
          getEndpoint: (endpoint: string) => `http://${endpoint}`,
          pipeHttpResponse: () => of(null),
        },
      },
      provideHttpClientTesting(),
      provideHttpClient(),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let service: AppStaticDataService;
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
    service = TestBed.inject(AppStaticDataService);
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
    await lastValueFrom(service.staticData());
    expect(httpHandlersSpy.getEndpoint).toHaveBeenCalledWith('diagnostics/static');
    expect(httpClientGetSpy).toHaveBeenCalledWith('http://diagnostics/static');
    expect(httpHandlersSpy.pipeHttpResponse).toHaveBeenCalledTimes(1);
  });
});

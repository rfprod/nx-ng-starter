import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { AppHttpHandlersService } from '@app/client-store-http-progress';
import { flushHttpRequests, getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { lastValueFrom, of } from 'rxjs';

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
    getEndpoint: jest.SpyInstance;
    pipeHttpResponse: jest.SpyInstance;
  };

  let httpClient: HttpClient;
  let httpClientGetSpy: jest.SpyInstance;

  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AppStaticDataService);
    httpHandlers = TestBed.inject(AppHttpHandlersService);
    httpHandlersSpy = {
      getEndpoint: jest.spyOn(httpHandlers, 'getEndpoint'),
      pipeHttpResponse: jest.spyOn(httpHandlers, 'pipeHttpResponse'),
    };
    httpClient = TestBed.inject(HttpClient);
    httpClientGetSpy = jest.spyOn(httpClient, 'get');
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

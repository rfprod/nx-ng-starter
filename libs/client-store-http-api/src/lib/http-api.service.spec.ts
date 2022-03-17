import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import {
  AppHttpHandlersService,
  AppHttpProgressStoreModule,
  AppToasterService,
  httpProgressModuleProviders,
  toasterServiceProvider,
} from '@app/client-store-http-progress';
import { AppClientTranslateModule } from '@app/client-translate';
import { flushHttpRequests, getTestBedConfig, newTestBedMetadata } from '@app/client-unit-testing';
import { Apollo, ApolloModule } from 'apollo-angular';
import { of } from 'rxjs';

import { AppHttpApiService } from './http-api.service';

describe('AppHttpApiService', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [ApolloModule, AppClientTranslateModule, AppHttpProgressStoreModule.forRoot()],
    providers: [...httpProgressModuleProviders, toasterServiceProvider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let service: AppHttpApiService;
  let apollo: Apollo;
  let httpHandlers: AppHttpHandlersService;
  let toaster: AppToasterService;
  let spy: {
    httpHandlers: {
      pipeHttpResponse: jest.SpyInstance;
    };
  };

  let httpController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        httpController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(AppHttpApiService);
        toaster = TestBed.inject(AppToasterService);
        httpHandlers = TestBed.inject(AppHttpHandlersService);
        apollo = TestBed.inject(Apollo);
        spy = {
          httpHandlers: {
            pipeHttpResponse: jest.spyOn(httpHandlers, 'pipeHttpResponse').mockReturnValue(of({})),
          },
        };
        expect(spy.httpHandlers.pipeHttpResponse).toBeDefined();
        flushHttpRequests(httpController);
      });
  }));

  afterEach(() => {
    flushHttpRequests(httpController, true);
  });

  it('should exist', () => {
    expect(service).toBeTruthy();
    expect(apollo).toBeDefined();
    expect(toaster).toBeDefined();
  });
});

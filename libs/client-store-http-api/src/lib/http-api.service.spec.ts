import { HttpRequest } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import {
  AppHttpHandlersService,
  AppHttpProgressStoreModule,
  AppToasterService,
  httpProgressModuleProviders,
  toasterServiceProvider,
} from '@app/client-store-http-progress';
import { AppClientTranslateModule } from '@app/client-translate';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-unit-testing';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';

import { AppHttpApiService } from './http-api.service';

describe('AppHttpApiService', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [AppClientTranslateModule, AppHttpProgressStoreModule.forRoot()],
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

  beforeEach(
    waitForAsync(() => {
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
          httpController.match(() => true).forEach((req: TestRequest) => (!req.cancelled ? req.flush({}) : null));
        });
    }),
  );

  afterEach(() => {
    httpController
      .match((req: HttpRequest<unknown>): boolean => true)
      .forEach((req: TestRequest) => (!req.cancelled ? req.flush({}) : null));
    httpController.verify();
  });

  it('should exist', () => {
    expect(service).toBeTruthy();
    expect(apollo).toBeDefined();
    expect(toaster).toBeDefined();
  });
});

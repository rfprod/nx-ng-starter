import { HttpRequest } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { async, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { AppSharedServicesModule, AppToasterService } from '@nx-ng-starter/client-services';
import { AppSharedUiTranslateModule } from '@nx-ng-starter/client-ui-translate';
import { getTestBedConfig, newTestBedMetadata } from '@nx-ng-starter/mocks-core';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';

import {
  AppHttpProgressModule,
  httpProgressModuleProviders,
} from '../http-progress/http-progress.module';
import { AppUserService } from '../user/user.service';
import { httpApiModuleProviders } from './http-api.module';
import { AppHttpApiService } from './http-api.service';
import { AppHttpHandlersService } from './http-handlers.service';

describe('AppHttpApiService', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [
      AppSharedUiTranslateModule,
      AppHttpProgressModule.forRoot(),
      AppSharedServicesModule.forRoot(),
    ],
    providers: [...httpProgressModuleProviders, ...httpApiModuleProviders],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let service: AppHttpApiService;
  let apollo: Apollo;
  let httpHandlers: AppHttpHandlersService;
  let toaster: AppToasterService;
  let user: AppUserService;
  let spy: {
    httpHandlers: {
      pipeHttpResponse: jest.SpyInstance;
    };
  };

  let httpController: HttpTestingController;

  beforeEach(async(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        httpController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(AppHttpApiService);
        toaster = TestBed.inject(AppToasterService);
        httpHandlers = TestBed.inject(AppHttpHandlersService);
        apollo = TestBed.inject(Apollo);
        user = TestBed.inject(AppUserService);
        spy = {
          httpHandlers: {
            pipeHttpResponse: jest.spyOn(httpHandlers, 'pipeHttpResponse').mockReturnValue(of({})),
          },
        };
        expect(spy.httpHandlers.pipeHttpResponse).toBeDefined();
        httpController
          .match(() => true)
          .forEach((req: TestRequest) => (!req.cancelled ? req.flush({}) : null));
      });
  }));

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
    expect(user).toBeDefined();
  });
});

import { HttpRequest } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { async, TestBed, TestModuleMetadata } from '@angular/core/testing';
import {
  getTestBedConfig,
  httpHandlersProviders,
  newTestBedMetadata,
} from '@nx-ng-starter/mocks-core';
import { HttpHandlersService, ToasterService } from '@nx-ng-starter/shared-core/services';
import { AppTranslateModule, CustomMaterialModule } from '@nx-ng-starter/shared-ui';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { of } from 'rxjs';

import {
  HttpProgressModule,
  httpProgressModuleProviders,
} from '../http-progress/http-progress.module';
import { UserService } from '../user/user.service';
import { httpApiModuleProviders } from './http-api.module';
import { HttpApiService } from './http-api.service';

describe('HttpApiService', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [
      CustomMaterialModule,
      AppTranslateModule,
      ApolloModule,
      HttpLinkModule,
      HttpProgressModule.forRoot(),
    ],
    providers: [
      ...httpHandlersProviders,
      ...httpProgressModuleProviders,
      ...httpApiModuleProviders,
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let service: HttpApiService;
  let apollo: Apollo;
  let httpHandlers: HttpHandlersService;
  let toaster: ToasterService;
  let user: UserService;
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
        service = TestBed.inject(HttpApiService);
        toaster = TestBed.inject(ToasterService);
        httpHandlers = TestBed.inject(HttpHandlersService);
        apollo = TestBed.inject(Apollo);
        user = TestBed.inject(UserService);
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

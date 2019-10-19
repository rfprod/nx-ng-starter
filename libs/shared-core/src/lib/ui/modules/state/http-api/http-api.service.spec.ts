import { TestBed, TestModuleMetadata, async } from '@angular/core/testing';

import { HttpRequest } from '@angular/common/http';

import {
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';

import { of } from 'rxjs';

import { HttpApiService } from './http-api.service';

import { HttpProgressModule, httpProgressModuleProviders } from '../http-progress/http-progress.module';

import { HttpHandlersService, ToasterService } from '@nx-ng-starter/shared-core/data-access';

import { Apollo, ApolloModule } from 'apollo-angular';
import { UserService } from '../user/user.service';
import { httpApiModuleProviders } from './http-api.module';

import { CustomMaterialModule } from '../../custom-material/custom-material.module';

import { HttpLinkModule } from 'apollo-angular-link-http';
import { AppTranslateModule } from '../../translate/app-translate.module';

import { getTestBedConfig, httpHandlersProviders, newTestBedMetadata } from '@nx-ng-starter/mocks-core';

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
  let httpTestingController: HttpTestingController;
  let httpHandlers: HttpHandlersService | any;
  let toaster: ToasterService;
  let user: UserService | any;
  let spy: {
    httpHandlers: {
      pipeRequestWithObjectResponse: jest.SpyInstance;
    };
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        service = TestBed.get(HttpApiService);
        toaster = TestBed.get(ToasterService);
        httpTestingController = TestBed.get(HttpTestingController);
        httpHandlers = TestBed.get(HttpHandlersService);
        apollo = TestBed.get(Apollo);
        user = TestBed.get(UserService);
        spy = {
          httpHandlers: {
            pipeRequestWithObjectResponse: jest
              .spyOn(httpHandlers, 'pipeRequestWithObjectResponse')
              .mockReturnValue(of({})),
          },
        };
        expect(spy.httpHandlers.pipeRequestWithObjectResponse).toBeDefined();
      });
  }));

  afterEach(() => {
    httpTestingController
      .match((req: HttpRequest<any>): boolean => true)
      .forEach((req: TestRequest) => (!req.cancelled ? req.flush({}) : null));
    httpTestingController.verify();
  });

  it('should exist', () => {
    expect(service).toBeTruthy();
    expect(apollo).toBeDefined();
    expect(toaster).toBeDefined();
    expect(user).toBeDefined();
  });
});

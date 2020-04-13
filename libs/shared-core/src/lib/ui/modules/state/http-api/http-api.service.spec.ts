import { HttpRequest } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed, TestModuleMetadata, async } from '@angular/core/testing';
import {
  getTestBedConfig,
  httpHandlersProviders,
  newTestBedMetadata,
} from '@nx-ng-starter/mocks-core';
import { HttpHandlersService, ToasterService } from '@nx-ng-starter/shared-core/data-access';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { of } from 'rxjs';
import { CustomMaterialModule } from '../../custom-material/custom-material.module';
import { AppTranslateModule } from '../../translate/app-translate.module';
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
  let httpHandlers: HttpHandlersService | any;
  let toaster: ToasterService;
  let user: UserService | any;
  let spy: {
    httpHandlers: {
      pipeRequestWithObjectResponse: jest.SpyInstance;
    };
  };

  let httpController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule(testBedConfig)
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
            pipeRequestWithObjectResponse: jest
              .spyOn(httpHandlers, 'pipeRequestWithObjectResponse')
              .mockReturnValue(of({})),
          },
        };
        expect(spy.httpHandlers.pipeRequestWithObjectResponse).toBeDefined();
        httpController
          .match(_ => true)
          .forEach((req: TestRequest) => (!req.cancelled ? req.flush({}) : null));
      });
  }));

  afterEach(() => {
    httpController
      .match((req: HttpRequest<any>): boolean => true)
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

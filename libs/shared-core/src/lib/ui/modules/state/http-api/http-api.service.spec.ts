import { TestBed, async } from '@angular/core/testing';

import { HttpRequest } from '@angular/common/http';

import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';

import { of } from 'rxjs';

import { HttpApiService } from './http-api.service';

import { httpHandlersProviders } from '@nx-ng-starter/mocks-core';

import { HttpProgressModule, httpProgressModuleProviders } from '../http-progress/http-progress.module';

import { HttpHandlersService, ToasterService } from '@nx-ng-starter/shared-core/data-access';

import { Apollo, ApolloModule } from 'apollo-angular';
import { UserService } from '../user/user.service';
import { httpApiModuleProviders } from './http-api.module';

import { CustomMaterialModule } from '../../custom-material/custom-material.module';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { AppTranslateModule } from '../../translate/app-translate.module';

describe('HttpApiService', () => {
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
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CustomMaterialModule,
        AppTranslateModule,
        ApolloModule,
        HttpLinkModule,
        NgxsModule.forRoot([], { developmentMode: true }),
        NgxsLoggerPluginModule.forRoot({ disabled: true, collapsed: true }),
        NgxsFormPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        HttpProgressModule.forRoot(),
      ],
      providers: [
        ...httpHandlersProviders,
        ...httpProgressModuleProviders,
        ...httpApiModuleProviders,
      ],
    })
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
    expect(spy).toBeDefined();
    expect(apollo).toBeDefined();
    expect(toaster).toBeDefined();
    expect(user).toBeDefined();
  });
});

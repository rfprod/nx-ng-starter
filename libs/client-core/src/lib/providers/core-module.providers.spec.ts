import { APP_BASE_HREF, DOCUMENT, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { documentFactory, IWebClientAppEnvironment, WEB_CLIENT_APP_ENV, WINDOW, windowFactory } from '@app/client-util';
import { HttpLink } from 'apollo-angular/http';

import { appCoreModuleProviders } from './core-module.providers';

describe('core-module-proviers', () => {
  const testingEnvironment: IWebClientAppEnvironment = {
    production: false,
    platform: 'web',
    appName: 'Testing Environment',
    description: 'Testing description',
    api: window.location.origin.includes('localhost') ? 'http://localhost:8080/api' : `${window.location.origin}/api`,
    envoyUrl: '',
    sentry: {
      env: 'unit-testing',
      dsn: '',
      tracingOrigins: [],
      tracesSampleRate: 0.0,
    },
    meta: {
      version: 'N/A',
    },
  };

  const testBedConfig: TestModuleMetadata = {
    imports: [HttpClientTestingModule],
    providers: [...appCoreModuleProviders(testingEnvironment)],
  };

  let locationStrategy: LocationStrategy;
  let appBaseHref: string;
  let win: Window;
  let doc: Document;
  let httpLink: HttpLink;
  let env: IWebClientAppEnvironment;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        locationStrategy = TestBed.inject(LocationStrategy);
        appBaseHref = TestBed.inject(APP_BASE_HREF);
        win = TestBed.inject(WINDOW);
        doc = TestBed.inject(DOCUMENT);
        httpLink = TestBed.inject(HttpLink);
        env = TestBed.inject(WEB_CLIENT_APP_ENV);
      });
  }));

  it('appCoreModuleProviders should provide expected providers', () => {
    expect(locationStrategy instanceof PathLocationStrategy).toBeTruthy();
    expect(appBaseHref).toEqual('/');
    expect(win).toEqual(windowFactory());
    expect(doc).toEqual(documentFactory());
    expect(httpLink).toBeDefined();
    expect(env).toMatchObject(testingEnvironment);
  });
});

import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModuleWithProviders, NgModule, NgZone, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from '@app/client-material';
import { documentProvider, IWebClientAppEnvironment, WEB_CLIENT_APP_ENV, windowProvider } from '@app/client-util';
import { EffectsModule } from '@ngrx/effects';
import { NavigationActionTiming, routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { HttpLink } from 'apollo-angular/http';

import { AppTestingComponent } from './components/testing/testing.component.mock';
import { dialogRefMockProvider } from './refs/dialog-ref.mock';
import { overlayRefMockProvider } from './refs/overlay-ref.mock';
import { matSnackbarRefMockProvider } from './refs/snackbar-ref.mock';

export const testingEnvironment: IWebClientAppEnvironment = {
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

export const mocksCoreModuleProviders: Provider[] = [
  HttpLink,
  dialogRefMockProvider,
  overlayRefMockProvider,
  matSnackbarRefMockProvider,
  {
    provide: APP_BASE_HREF,
    useValue: '/',
  },
  windowProvider,
  documentProvider,
  {
    provide: WEB_CLIENT_APP_ENV,
    useValue: testingEnvironment,
  },
  {
    provide: NgZone,
    useFactory: () => new NgZone({ enableLongStackTrace: false, shouldCoalesceEventChangeDetection: false }),
  },
];

@NgModule({
  imports: [
    BrowserDynamicTestingModule,
    NoopAnimationsModule,
    HttpClientTestingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterTestingModule,
    AppMaterialModule.forRoot(),
    StoreModule.forRoot({ router: routerReducer }),
    EffectsModule.forRoot(),
    StoreRouterConnectingModule.forRoot({
      navigationActionTiming: NavigationActionTiming.PostActivation,
    }),
  ],
  declarations: [AppTestingComponent],
  exports: [
    BrowserDynamicTestingModule,
    NoopAnimationsModule,
    HttpClientTestingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    RouterTestingModule,
    AppTestingComponent,
  ],
})
export class AppMocksCoreModule {
  public static forRoot(): ModuleWithProviders<AppMocksCoreModule> {
    return {
      ngModule: AppMocksCoreModule,
      providers: [...mocksCoreModuleProviders],
    };
  }
}

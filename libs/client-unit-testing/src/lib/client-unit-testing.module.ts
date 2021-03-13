import { APP_BASE_HREF, DOCUMENT } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModuleWithProviders, NgModule, NgZone, Provider } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppClientMaterialModule } from '@nx-ng-starter/client-material';
import {
  documentFactory,
  IWebClientAppEnvironment,
  WEB_CLIENT_APP_ENV,
  WINDOW,
  windowFactory,
} from '@nx-ng-starter/client-util';
import { HttpLink } from 'apollo-angular/http';

import { AppDummyComponent } from './components/dummy/dummy.component.mock';
import { dialogRefMockProvider } from './refs/dialog-ref.mock';
import { overlayRefMockProvider } from './refs/overlay-ref.mock';
import { matSnackbarRefMockProvider } from './refs/snackbar-ref.mock';

export const testingEnvironment: IWebClientAppEnvironment = {
  production: false,
  platform: 'web',
  appName: 'Testing Environment',
  api: window.location.origin.includes('localhost')
    ? 'http://localhost:8080/api'
    : `${window.location.origin}/api`,
  envoyUrl: '',
  sentryEnv: 'unit-testing',
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
  { provide: WINDOW, useFactory: windowFactory },
  { provide: DOCUMENT, useFactory: documentFactory },
  {
    provide: WEB_CLIENT_APP_ENV,
    useValue: testingEnvironment,
  },
  {
    provide: NgZone,
    useFactory: () =>
      new NgZone({ enableLongStackTrace: false, shouldCoalesceEventChangeDetection: false }),
  },
];

@NgModule({
  imports: [
    BrowserDynamicTestingModule,
    NoopAnimationsModule,
    HttpClientTestingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppClientMaterialModule.forRoot(),
    HttpClientTestingModule,
    RouterTestingModule,
    NgxsModule.forRoot([], { developmentMode: true }),
    NgxsFormPluginModule.forRoot(),
  ],
  declarations: [AppDummyComponent],
  exports: [
    BrowserDynamicTestingModule,
    NoopAnimationsModule,
    HttpClientTestingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppClientMaterialModule,
    HttpClientTestingModule,
    RouterTestingModule,
    AppDummyComponent,
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

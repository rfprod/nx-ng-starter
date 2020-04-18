import { Provider } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  APP_ENV,
  HttpHandlersService,
  ToasterService,
  WebAppEnvironment,
  appEnvProvider,
  toasterServiceProvider,
} from '@nx-ng-starter/shared-core/data-access';
import {
  HttpProgressService,
  UserService,
  httpProgressServiceProvider,
  userServiceProvider,
} from '@nx-ng-starter/shared-core/ui';
import { WINDOW } from '@nx-ng-starter/shared-core/util';
import { HttpLink } from 'apollo-angular-link-http';
import { dialogRefMockProvider } from '../../util/refs/dialog-ref.mock';
import { overlayRefMockProvider } from '../../util/refs/overlay-ref.mock';
import { matSnackbarRefMockProvider } from '../../util/refs/snackbar-ref.mock';

export const testingEnvironment = {
  production: false,
  appName: 'Testing Environment',
  api: /localhost/.test(window.location.origin)
    ? 'http://localhost:8080/api'
    : `${window.location.origin}/api`,
};

/**
 * Http handlers provider mock.
 */
export const httpHandlersProviders: Provider[] = [
  { provide: WINDOW, useValue: window },
  HttpLink,
  TranslateService,
  userServiceProvider,
  overlayRefMockProvider,
  httpProgressServiceProvider,
  dialogRefMockProvider,
  matSnackbarRefMockProvider,
  toasterServiceProvider,
  appEnvProvider,
  {
    provide: APP_ENV,
    useValue: testingEnvironment,
  },
  {
    provide: HttpHandlersService,
    useFactory: (
      user: UserService,
      toaster: ToasterService,
      httpLink: HttpLink,
      progress: HttpProgressService,
      translate: TranslateService,
      win: Window,
      env: WebAppEnvironment,
    ) => new HttpHandlersService(user, toaster, httpLink, progress, translate, win, env),
    deps: [
      UserService,
      ToasterService,
      HttpLink,
      HttpProgressService,
      TranslateService,
      WINDOW,
      APP_ENV,
    ],
  },
];

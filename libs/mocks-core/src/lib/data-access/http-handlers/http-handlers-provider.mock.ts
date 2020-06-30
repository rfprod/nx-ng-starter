import { Provider } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  APP_ENV,
  appEnvProvider,
  HttpHandlersService,
  ToasterService,
  toasterServiceProvider,
  WebEnvironment,
} from '@nx-ng-starter/shared-core/services';
import {
  HttpProgressService,
  httpProgressServiceProvider,
  UserService,
  userServiceProvider,
} from '@nx-ng-starter/shared-store/state';
import { getWindow, WINDOW } from '@nx-ng-starter/shared-util';
import { HttpLink } from 'apollo-angular-link-http';

import { dialogRefMockProvider } from '../../util/refs/dialog-ref.mock';
import { overlayRefMockProvider } from '../../util/refs/overlay-ref.mock';
import { matSnackbarRefMockProvider } from '../../util/refs/snackbar-ref.mock';

export const testingEnvironment = {
  production: false,
  appName: 'Testing Environment',
  api: window.location.origin.includes('localhost')
    ? 'http://localhost:8080/api'
    : `${window.location.origin}/api`,
};

/**
 * Http handlers provider mock.
 */
export const httpHandlersProviders: Provider[] = [
  { provide: WINDOW, useFactory: getWindow },
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
      env: WebEnvironment,
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

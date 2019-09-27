import { HttpLink } from 'apollo-angular-link-http';

import { Provider } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { overlayRefMockProvider } from '../../util/refs/overlay-ref.mock';

import { dialogRefMockProvider } from '../../util/refs/dialog-ref.mock';

import { matSnackbarRefMockProvider } from '../../util/refs/snackbar-ref.mock';

import {
  APP_ENV,
  AppEnvironment,
  HttpHandlersService,
  ToasterService,
  appEnvProvider,
  toasterServiceProvider,
} from '@nx-ng-starter/shared-core/data-access';

import {
  HttpProgressService,
  UserService,
  httpProgressServiceProvider,
  userServiceProvider,
} from '@nx-ng-starter/shared-core/ui';

/**
 * Http handlers provider mock.
 */
export const httpHandlersProvider: Provider[] = [
  { provide: 'Window', useValue: window },
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
    provide: HttpHandlersService,
    useFactory: (
      user: UserService,
      toaster: ToasterService,
      httpLink: HttpLink,
      progress: HttpProgressService,
      translate: TranslateService,
      win: Window,
      env: AppEnvironment,
    ) => new HttpHandlersService(user, toaster, httpLink, progress, translate, win, env),
    deps: [
      UserService,
      ToasterService,
      HttpLink,
      HttpProgressService,
      TranslateService,
      'Window',
      APP_ENV,
    ],
  },
];

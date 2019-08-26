import { HttpLink } from 'apollo-angular-link-http';

import { OverlayRef } from '@angular/cdk/overlay';
import { OverlayRefMock } from '../../util/refs/overlay-ref.mock';

import { MatDialogRef, MatSnackBar } from '@angular/material';
import { DialogRefMock } from '../../util/refs/dialog-ref.mock';

import { TranslateService } from '@ngx-translate/core';
import { MatSnackbarRefMock } from '../../util/refs/snackbar-ref.mock';

import {
  UserService,
  ProgressService,
  ToasterService,
  APP_ENV,
  AppEnvironment,
  HttpHandlersService
} from '@nx-ng-starter/shared-core/data-access';


/**
 * Http handlers provider mock.
 */
export const httpHandlersProvider = [
  { provide: 'Window', useValue: window },
  {
    provide: UserService,
    useFactory: () => new UserService(),
  },
  HttpLink,
  {
    provide: OverlayRef,
    useClass: OverlayRefMock
  },
  {
    provide: ProgressService,
    useFactory: (overlay: OverlayRef) => new ProgressService(overlay),
    deps: [OverlayRef]
  },
  {
    provide: MatDialogRef,
    useClass: DialogRefMock
  },
  TranslateService,
  {
    provide: MatSnackBar,
    useClass: MatSnackbarRefMock
  },
  {
    provide: ToasterService,
    useFactory: (snackBar: MatSnackBar) => new ToasterService(snackBar),
    deps: [MatSnackBar]
  },
  {
    provide: APP_ENV,
    useFactory: () => new AppEnvironment()
  },
  {
    provide: HttpHandlersService,
    useFactory: (
      user: UserService,
      toaster: ToasterService,
      httpLink: HttpLink,
      progress: ProgressService,
      translate: TranslateService,
      win: Window,
      env: AppEnvironment
    ) =>
      new HttpHandlersService(
        user,
        toaster,
        httpLink,
        progress,
        translate,
        win,
        env
      ),
    deps: [
      UserService,
      ToasterService,
      HttpLink,
      ProgressService,
      TranslateService,
      'Window',
      APP_ENV
    ]
  }
];

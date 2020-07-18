import { APP_BASE_HREF, DOCUMENT, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Provider } from '@angular/core';
import { documentFactory, WINDOW, windowFactory } from '@nx-ng-starter/shared-util';
import { HttpLink } from 'apollo-angular-link-http';

/**
 * Shared core module providers.
 */
export const appSharedCoreModuleProviders: Provider[] = [
  {
    provide: LocationStrategy,
    useClass: PathLocationStrategy,
  },
  { provide: APP_BASE_HREF, useValue: '/' },
  { provide: WINDOW, useFactory: windowFactory },
  { provide: DOCUMENT, useFactory: documentFactory },
  HttpLink,
];

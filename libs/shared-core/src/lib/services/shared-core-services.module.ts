import { APP_BASE_HREF, DOCUMENT, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { getDocument, getWindow, WINDOW } from '@nx-ng-starter/shared-util';
import { HttpLink } from 'apollo-angular-link-http';

/**
 * Module providers.
 */
export const appSharedCoreModuleProviders: Provider[] = [
  {
    provide: LocationStrategy,
    useClass: PathLocationStrategy,
  },
  { provide: APP_BASE_HREF, useValue: '/' },
  { provide: WINDOW, useFactory: getWindow },
  { provide: DOCUMENT, useFactory: getDocument },
  HttpLink,
];

/**
 * Shared core services module.
 * Contains shared core services.
 */
@NgModule()
export class AppSharedCoreServicesModule {
  /**
   * Provides services.
   */
  public static forRoot(): ModuleWithProviders<AppSharedCoreServicesModule> {
    return {
      ngModule: AppSharedCoreServicesModule,
      providers: [...appSharedCoreModuleProviders],
    };
  }
}

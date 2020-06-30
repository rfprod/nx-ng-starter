import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { getWindow, WINDOW } from '@nx-ng-starter/shared-util';
import { HttpLink } from 'apollo-angular-link-http';

import { AppHttpHandlersService } from './http-handlers/http-handlers.service';
import { AppMarkdownService } from './markdown/markdown.service';
import { AppToasterService } from './toaster/toaster.service';

/**
 * Module providers.
 */
export const appSharedCoreModuleProviders: Provider[] = [
  {
    provide: LocationStrategy,
    useClass: PathLocationStrategy,
  },
  { provide: WINDOW, useFactory: getWindow },
  AppMarkdownService,
  AppToasterService,
  AppHttpHandlersService,
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

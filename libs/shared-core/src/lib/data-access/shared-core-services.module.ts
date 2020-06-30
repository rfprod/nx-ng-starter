import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { getWindow, WINDOW } from '@nx-ng-starter/shared-util';
import { HttpLink } from 'apollo-angular-link-http';

import { HttpHandlersService } from './http-handlers/http-handlers.service';
import { MarkdownService } from './markdown/markdown.service';
import { ToasterService } from './toaster/toaster.service';

/**
 * Module providers.
 */
export const sharedCoreModuleProviders: Provider[] = [
  {
    provide: LocationStrategy,
    useClass: PathLocationStrategy,
  },
  { provide: WINDOW, useFactory: getWindow },
  MarkdownService,
  ToasterService,
  HttpHandlersService,
  HttpLink,
];

/**
 * Shared core services module.
 * Contains shared core services.
 */
@NgModule()
export class SharedCoreServicesModule {
  /**
   * Provides services.
   */
  public static forRoot(): ModuleWithProviders<SharedCoreServicesModule> {
    return {
      ngModule: SharedCoreServicesModule,
      providers: [...sharedCoreModuleProviders],
    };
  }
}

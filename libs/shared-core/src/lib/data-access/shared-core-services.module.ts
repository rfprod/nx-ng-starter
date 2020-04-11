import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { getWindow } from '../util/general-purpose/factories';
import { WINDOW } from '../util/general-purpose/injection-tokens';
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

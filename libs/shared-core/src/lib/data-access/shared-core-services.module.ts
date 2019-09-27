import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

import { LocationStrategy, PathLocationStrategy } from '@angular/common';

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
  {
    provide: 'Window',
    useValue: window,
  },
  MarkdownService,
  ToasterService,
  HttpHandlersService,
];

/**
 * Shared core services module.
 * Contains shared core services.
 */
@NgModule({})
export class SharedCoreServicesModule {
  /**
   * Provides services.
   */
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedCoreServicesModule,
      providers: [...sharedCoreModuleProviders],
    };
  }
}

import {
  NgModule,
  ModuleWithProviders,
  Provider
} from '@angular/core';

import {
  LocationStrategy,
  PathLocationStrategy
} from '@angular/common';

import { EventEmitterService } from './event-emitter/event-emitter.service';
import { MarkdownService } from './markdown/markdown.service';

/**
 * Module providers.
 */
export const sharedCoreModuleProviders: Provider[] = [
  {
    provide: LocationStrategy,
    useClass: PathLocationStrategy
  },
  {
    provide: 'Window',
    useValue: window
  },
  EventEmitterService,
  MarkdownService
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
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedCoreServicesModule,
      providers: [
        ...sharedCoreModuleProviders
      ]
    };
  }

}

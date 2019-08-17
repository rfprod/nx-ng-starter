import {
  NgModule,
  ModuleWithProviders,
  Provider
} from '@angular/core';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { AppTranslationUtilsService } from './services/app-translation-utils.service';

/**
 * Module providers.
 */
export const appTranslateModuleProviders: Provider[] = [
  TranslateService,
  AppTranslationUtilsService
];

/**
 * Application internationalization module.
 */
@NgModule({
  imports: [
    TranslateModule.forRoot()
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    TranslateService,
    AppTranslationUtilsService
  ],
})
export class AppTranslateModule {

  /**
   * Constructor.
   * @param utils Translation utils service
   */
  constructor(
    private utils: AppTranslationUtilsService
  ) {
    this.utils.initialize();
  }

  /**
   * Application internationalization module with providers.
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppTranslateModule,
      providers: [
        ...appTranslateModuleProviders
      ]
    }
  }

}

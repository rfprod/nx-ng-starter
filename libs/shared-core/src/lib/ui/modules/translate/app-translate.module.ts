import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { AppTranslationUtilsService } from './services/app-translate.service';

/**
 * Application internationalization module.
 */
@NgModule({
  exports: [
    CommonModule,
    TranslateModule
  ],
  providers: [
    AppTranslationUtilsService
  ],
  imports: [
    TranslateModule.forRoot()
  ]
})
export class AppTranslateModule {

  /**
   * @param utils Translation utils service
   */
  constructor(
    utils: AppTranslationUtilsService
  ) {
    utils.initialize();
  }

}

/**
 * Application internationalization module with providers.
 */
export const AppTranslateModuleWithProviders: ModuleWithProviders = {
  ngModule: AppTranslateModule,
  providers: [
    TranslateService,
    AppTranslationUtilsService
  ]
};

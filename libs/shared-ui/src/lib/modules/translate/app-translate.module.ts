import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { AppTranslationUtilsService } from './services/app-translation-utils.service';
import { RU, RU_DICTIONARY } from './shared/ru';

/**
 * Module providers.
 */
export const appTranslateModuleProviders: Provider[] = [
  TranslateService,
  AppTranslationUtilsService,
  { provide: RU_DICTIONARY, useValue: RU },
];

/**
 * Application internationalization module.
 */
@NgModule({
  imports: [TranslateModule.forRoot()],
  exports: [TranslateModule],
  providers: [...appTranslateModuleProviders],
})
export class AppTranslateModule {
  /**
   * Constructor.
   * @param utils Translation utils service
   */
  constructor(private readonly utils: AppTranslationUtilsService) {
    this.utils.initialize();
  }

  /**
   * Application internationalization module with providers.
   */
  public static forRoot(): ModuleWithProviders<AppTranslateModule> {
    return {
      ngModule: AppTranslateModule,
      providers: [...appTranslateModuleProviders],
    };
  }
}

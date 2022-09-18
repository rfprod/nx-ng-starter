import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { appTranslateModuleProviders } from './providers/translate-module.providers';
import { AppTranslationUtilsService } from './services/app-translation-utils.service';

/**
 * Application internationalization module.
 */
@NgModule({
  imports: [TranslateModule.forRoot()],
  exports: [TranslateModule],
  providers: [...appTranslateModuleProviders],
})
export class AppTranslateModule {
  constructor(private readonly utils: AppTranslationUtilsService) {
    this.utils.initialize();
  }

  public static forRoot(): ModuleWithProviders<AppTranslateModule> {
    return {
      ngModule: AppTranslateModule,
      providers: [...appTranslateModuleProviders],
    };
  }
}

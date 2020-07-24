import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { appSharedUiTranslateModuleProviders } from './providers/client-ui-translate-module.providers';
import { AppTranslationUtilsService } from './services/app-translation-utils.service';

/**
 * Application internationalization module.
 */
@NgModule({
  imports: [TranslateModule.forRoot()],
  exports: [TranslateModule],
  providers: [...appSharedUiTranslateModuleProviders],
})
export class AppSharedUiTranslateModule {
  /**
   * Constructor.
   * @param utils Translation utils service
   */
  constructor(private readonly utils: AppTranslationUtilsService) {
    this.utils.initialize();
  }

  /**
   * Provides services.
   */
  public static forRoot(): ModuleWithProviders<AppSharedUiTranslateModule> {
    return {
      ngModule: AppSharedUiTranslateModule,
      providers: [...appSharedUiTranslateModuleProviders],
    };
  }
}

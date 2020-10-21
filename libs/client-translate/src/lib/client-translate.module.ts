import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { appSharedUiTranslateModuleProviders } from './providers/client-translate-module.providers';
import { AppTranslationUtilsService } from './services/app-translation-utils.service';

/**
 * Application internationalization module.
 */
@NgModule({
  imports: [TranslateModule.forRoot()],
  exports: [TranslateModule],
  providers: [...appSharedUiTranslateModuleProviders],
})
export class AppClientTranslateModule {
  constructor(private readonly utils: AppTranslationUtilsService) {
    this.utils.initialize();
  }

  public static forRoot(): ModuleWithProviders<AppClientTranslateModule> {
    return {
      ngModule: AppClientTranslateModule,
      providers: [...appSharedUiTranslateModuleProviders],
    };
  }
}

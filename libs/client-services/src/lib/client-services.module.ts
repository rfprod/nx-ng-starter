import { ModuleWithProviders, NgModule } from '@angular/core';
import { AppClientUiTranslateModule } from '@nx-ng-starter/client-ui-translate';

import { AppMarkdownService } from './markdown/markdown.service';
import { AppToasterService } from './toaster/toaster.service';

/**
 * Shared core module.
 * Contains shared core modules with providers.
 */
@NgModule({
  imports: [AppClientUiTranslateModule.forRoot()],
  exports: [AppClientUiTranslateModule],
})
export class AppClientServicesModule {
  public static forRoot(): ModuleWithProviders<AppClientServicesModule> {
    return {
      ngModule: AppClientServicesModule,
      providers: [AppMarkdownService, AppToasterService],
    };
  }
}

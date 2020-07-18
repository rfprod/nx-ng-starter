import { ModuleWithProviders, NgModule } from '@angular/core';
import { AppSharedUiTranslateModule } from '@nx-ng-starter/shared-ui-translate';

import { AppMarkdownService } from './markdown/markdown.service';
import { AppToasterService } from './toaster/toaster.service';

/**
 * Shared core module.
 * Contains shared core modules with providers.
 */
@NgModule({
  imports: [AppSharedUiTranslateModule.forRoot()],
  exports: [AppSharedUiTranslateModule],
})
export class AppSharedServicesModule {
  public static forRoot(): ModuleWithProviders<AppSharedServicesModule> {
    return {
      ngModule: AppSharedServicesModule,
      providers: [AppMarkdownService, AppToasterService],
    };
  }
}

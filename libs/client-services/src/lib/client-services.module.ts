import { ModuleWithProviders, NgModule } from '@angular/core';

import { AppMarkdownService } from './markdown/markdown.service';
import { AppToasterService } from './toaster/toaster.service';

@NgModule({})
export class AppClientServicesModule {
  public static forRoot(): ModuleWithProviders<AppClientServicesModule> {
    return {
      ngModule: AppClientServicesModule,
      providers: [AppMarkdownService, AppToasterService],
    };
  }
}

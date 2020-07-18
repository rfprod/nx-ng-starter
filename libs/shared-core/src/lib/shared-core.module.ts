import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppSharedStoreModule } from '@nx-ng-starter/shared-store';
import {
  AppSharedUiMaterialModule,
  sharedUiMaterialModuleProviders,
} from '@nx-ng-starter/shared-ui-material';
import {
  AppSharedUiTranslateModule,
  appSharedUiTranslateModuleProviders,
} from '@nx-ng-starter/shared-ui-translate';
import { IWebClientAppEnvironment, WEB_CLIENT_APP_ENV } from '@nx-ng-starter/shared-util';

import { appSharedCoreModuleProviders } from './providers/shared-core-module.providers';

/**
 * Shared core module.
 * Contains shared core modules with providers.
 */
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppSharedUiMaterialModule.forRoot(),
    AppSharedUiTranslateModule.forRoot(),
    AppSharedStoreModule,
  ],
  exports: [
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppSharedUiMaterialModule,
    AppSharedUiTranslateModule,
    AppSharedStoreModule,
  ],
})
export class AppSharedCoreModule {
  /**
   * Provides services.
   * @param environment application environment, if omitted default environment will be provided.
   */
  public static forRoot(
    environment?: IWebClientAppEnvironment,
  ): ModuleWithProviders<AppSharedCoreModule> {
    return {
      ngModule: AppSharedCoreModule,
      providers: [
        ...sharedUiMaterialModuleProviders,
        ...appSharedUiTranslateModuleProviders,
        ...appSharedCoreModuleProviders,
        {
          provide: WEB_CLIENT_APP_ENV,
          useValue: environment,
        },
      ],
    };
  }
}

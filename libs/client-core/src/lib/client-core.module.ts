import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AppClientUiMaterialModule,
  sharedUiMaterialModuleProviders,
} from '@nx-ng-starter/client-material';
import { AppClientStoreModule } from '@nx-ng-starter/client-store';
import {
  AppClientUiTranslateModule,
  appSharedUiTranslateModuleProviders,
} from '@nx-ng-starter/client-translate';
import { IWebClientAppEnvironment, WEB_CLIENT_APP_ENV } from '@nx-ng-starter/client-util';

import { appSharedCoreModuleProviders } from './providers/client-core-module.providers';

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
    AppClientUiMaterialModule.forRoot(),
    AppClientUiTranslateModule.forRoot(),
    AppClientStoreModule,
  ],
  exports: [
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppClientUiMaterialModule,
    AppClientUiTranslateModule,
    AppClientStoreModule,
  ],
})
export class AppClientCoreModule {
  /**
   * Provides services.
   * @param environment application environment, if omitted default environment will be provided.
   */
  public static forRoot(
    environment?: IWebClientAppEnvironment,
  ): ModuleWithProviders<AppClientCoreModule> {
    return {
      ngModule: AppClientCoreModule,
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

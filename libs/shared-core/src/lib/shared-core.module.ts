import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedStoreModule } from '../../../shared-store/src/lib/shared-store.module';
import {
  AppMaterialModule,
  appMaterialModuleProviders,
  AppTranslateModule,
  appTranslateModuleProviders,
} from '../../../shared-ui/src/lib';
import { APP_ENV, AppWebEnvironment } from './interfaces';
import { appSharedCoreModuleProviders, AppSharedCoreServicesModule } from './services';

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
    AppMaterialModule.forRoot(),
    AppTranslateModule.forRoot(),
    AppSharedCoreServicesModule.forRoot(),
    SharedStoreModule,
  ],
  exports: [
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMaterialModule,
    AppTranslateModule,
    AppSharedCoreServicesModule,
    SharedStoreModule,
  ],
})
export class AppSharedCoreModule {
  /**
   * Provides services.
   * @param environment application environment, if omitted default environment will be provided.
   */
  public static forRoot(environment?: AppWebEnvironment): ModuleWithProviders<AppSharedCoreModule> {
    return {
      ngModule: AppSharedCoreModule,
      providers: [
        ...appMaterialModuleProviders,
        ...appTranslateModuleProviders,
        ...appSharedCoreModuleProviders,
        {
          provide: APP_ENV,
          useValue: environment,
        },
      ],
    };
  }
}

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedStoreModule } from '../../../shared-store/src/lib/shared-store.module';
import {
  APP_ENV,
  sharedCoreModuleProviders,
  SharedCoreServicesModule,
  WebEnvironment,
} from './data-access';
import {
  AppTranslateModule,
  appTranslateModuleProviders,
  CustomMaterialModule,
  customMaterialModuleProviders,
} from './ui';

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
    CustomMaterialModule.forRoot(),
    AppTranslateModule.forRoot(),
    SharedCoreServicesModule.forRoot(),
    SharedStoreModule,
  ],
  exports: [
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomMaterialModule,
    AppTranslateModule,
    SharedCoreServicesModule,
    SharedStoreModule,
  ],
})
export class SharedCoreModule {
  /**
   * Provides services.
   * @param environment application environment, if omitted default environment will be provided.
   */
  public static forRoot(environment?: WebEnvironment): ModuleWithProviders<SharedCoreModule> {
    return {
      ngModule: SharedCoreModule,
      providers: [
        ...customMaterialModuleProviders,
        ...appTranslateModuleProviders,
        ...sharedCoreModuleProviders,
        {
          provide: APP_ENV,
          useValue: environment,
        },
      ],
    };
  }
}

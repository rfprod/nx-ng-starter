import { ModuleWithProviders, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';

import {
  AppTranslateModule,
  CustomMaterialModule,
  UserModule,
  appTranslateModuleProviders,
  customMaterialModuleProviders,
  httpProgressModuleProviders,
  userModuleProviders,
} from './ui';

import {
  APP_ENV,
  AppEnvironment,
  SharedCoreServicesModule,
  sharedCoreModuleProviders,
} from './data-access';

import { HttpProgressModule } from '@nx-ng-starter/shared-core/ui';

/**
 * Shared core module.
 * Contains shared core modules with providers.
 */
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomMaterialModule.forRoot(),
    AppTranslateModule.forRoot(),
    SharedCoreServicesModule.forRoot(),
    HttpProgressModule.forRoot(),
    UserModule.forRoot(),
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomMaterialModule,
    AppTranslateModule,
    SharedCoreServicesModule,
    HttpProgressModule,
    UserModule,
  ],
})
export class SharedCoreModule {
  /**
   * Provides services.
   * @param environment application environment, if omitted default environment will be provided.
   */
  public static forRoot(environment?: AppEnvironment): ModuleWithProviders {
    return {
      ngModule: SharedCoreModule,
      providers: [
        ...customMaterialModuleProviders,
        ...appTranslateModuleProviders,
        ...sharedCoreModuleProviders,
        ...httpProgressModuleProviders,
        ...userModuleProviders,
        {
          provide: APP_ENV,
          useFactory: () => new AppEnvironment(environment),
        },
      ],
    };
  }
}

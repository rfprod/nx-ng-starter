import {
  NgModule,
  ModuleWithProviders
} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { HttpModule } from '@angular/http';

import { FlexLayoutModule } from '@angular/flex-layout';

import {
  CustomMaterialModule,
  customMaterialModuleProviders,
  AppTranslateModule,
  appTranslateModuleProviders
} from './ui';

import {
  SharedCoreServicesModule,
  sharedCoreModuleProviders,
  APP_ENV,
  AppEnvironment
} from './data-access';

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
    HttpModule,
    CustomMaterialModule.forRoot(),
    AppTranslateModule.forRoot(),
    SharedCoreServicesModule.forRoot()
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CustomMaterialModule,
    AppTranslateModule,
    SharedCoreServicesModule
  ]
})
export class SharedCoreModule {

  /**
   * Provides services.
   * @param environment application environment, if omitted default environment will be provided.
   */
  static forRoot(environment?: AppEnvironment): ModuleWithProviders {
    return {
      ngModule: SharedCoreModule,
      providers: [
        ...customMaterialModuleProviders,
        ...appTranslateModuleProviders,
        ...sharedCoreModuleProviders,
        {
          provide: APP_ENV,
          useFactory: () => new AppEnvironment(environment)
        }
      ]
    };
  }

}

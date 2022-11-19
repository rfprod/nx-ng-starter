import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppStoreModule } from '@app/client-store';
import { IWebClientAppEnvironment } from '@app/client-util';

import { appCoreModuleProviders } from './providers/core-module.providers';

/**
 * Client core module.
 */
@NgModule({
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, AppStoreModule],
  exports: [FormsModule, ReactiveFormsModule, HttpClientModule, AppStoreModule],
})
export class AppCoreModule {
  /**
   * Provides services.
   * @param environment the client application environment
   */
  public static forRoot(environment: IWebClientAppEnvironment): ModuleWithProviders<AppCoreModule> {
    return {
      ngModule: AppCoreModule,
      providers: [...appCoreModuleProviders(environment)],
    };
  }
}

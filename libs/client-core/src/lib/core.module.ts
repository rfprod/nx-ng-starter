import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppStoreModule } from '@app/client-store';
import { IWebClientAppEnvironment } from '@app/client-util';

import { appCoreModuleProviders } from './providers/core-module.providers';

/**
 * Client core module.
 */
@NgModule({
  exports: [FormsModule, ReactiveFormsModule, AppStoreModule],
  imports: [FormsModule, ReactiveFormsModule, AppStoreModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
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

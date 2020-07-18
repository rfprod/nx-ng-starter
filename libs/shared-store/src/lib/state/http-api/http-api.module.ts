import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { httpApiServiceProvider } from './http-api.service';
import { AppHttpApiState } from './http-api.store';

export const httpApiModuleProviders: Provider[] = [httpApiServiceProvider];

@NgModule({
  imports: [NgxsModule.forFeature([AppHttpApiState])],
  providers: [...httpApiModuleProviders],
})
export class AppHttpApiModule {
  public static forRoot(): ModuleWithProviders<AppHttpApiModule> {
    return {
      ngModule: AppHttpApiModule,
      providers: [...httpApiModuleProviders],
    };
  }
}

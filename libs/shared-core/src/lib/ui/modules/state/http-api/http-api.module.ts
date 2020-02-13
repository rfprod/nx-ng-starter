import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { httpApiServiceProvider } from './http-api.service';
import { HttpApiState } from './http-api.store';

export const httpApiModuleProviders: Provider[] = [httpApiServiceProvider];

@NgModule({
  declarations: [],
  imports: [NgxsModule.forFeature([HttpApiState])],
  providers: [...httpApiModuleProviders],
})
export class HttpApiModule {
  public static forRoot(): ModuleWithProviders<HttpApiModule> {
    return {
      ngModule: HttpApiModule,
      providers: [...httpApiModuleProviders],
    };
  }
}

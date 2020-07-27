import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { httpProgressServiceProvider } from './http-progress.service';
import { AppHttpProgressState } from './http-progress.store';

export const httpProgressModuleProviders: Provider[] = [httpProgressServiceProvider];

@NgModule({
  imports: [NgxsModule.forFeature([AppHttpProgressState])],
})
export class AppHttpProgressModule {
  public static forRoot(): ModuleWithProviders<AppHttpProgressModule> {
    return {
      ngModule: AppHttpProgressModule,
      providers: [...httpProgressModuleProviders],
    };
  }
}

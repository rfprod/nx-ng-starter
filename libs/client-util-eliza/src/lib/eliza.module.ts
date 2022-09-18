import { ModuleWithProviders, NgModule } from '@angular/core';

import { elizaData, elizaDataProvider } from './config/data.config';
import { IElizaData } from './interfaces/eliza.interface';

@NgModule({})
export class AppElizaModule {
  public static forRoot(data: IElizaData = elizaData): ModuleWithProviders<AppElizaModule> {
    return {
      ngModule: AppElizaModule,
      providers: [elizaDataProvider(data)],
    };
  }
}

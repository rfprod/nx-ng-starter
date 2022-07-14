import { ModuleWithProviders, NgModule } from '@angular/core';

import { elizaData, elizaDataProvider } from './config/data.config';
import { IElizaData } from './interfaces/eliza.interface';

@NgModule({})
export class AppClientUtilElizaModule {
  public static forRoot(data: IElizaData = elizaData): ModuleWithProviders<AppClientUtilElizaModule> {
    return {
      ngModule: AppClientUtilElizaModule,
      providers: [elizaDataProvider(data)],
    };
  }
}

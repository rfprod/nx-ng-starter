import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppHttpApiEffects } from './http-api.effects';
import { httpApiReducerConfig, IHttpApiState } from './http-api.interface';
import { httpApiReducerProvider } from './http-api.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature<IHttpApiState>(httpApiReducerConfig.featureName, httpApiReducerConfig.token),
    EffectsModule.forFeature([AppHttpApiEffects]),
  ],
})
export class AppHttpApiStoreModule {
  public static forRoot(): ModuleWithProviders<AppHttpApiStoreModule> {
    return {
      ngModule: AppHttpApiStoreModule,
      providers: [httpApiReducerProvider],
    };
  }
}

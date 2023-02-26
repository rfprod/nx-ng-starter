import { ModuleWithProviders, NgModule } from '@angular/core';
import { IWebClientAppEnvironment } from '@app/client-util';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppDiagnosticsEffects } from './diagnostics.effects';
import { featureName, IDiagnosticsState, IWebsocketConfig, WS_CONFIG } from './diagnostics.interface';
import { AppDiagnosticsReducer } from './diagnostics.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature<IDiagnosticsState>(featureName, AppDiagnosticsReducer.token),
    EffectsModule.forFeature([AppDiagnosticsEffects]),
  ],
})
export class AppDiagnosticsStoreModule {
  public static forRoot(env: IWebClientAppEnvironment): ModuleWithProviders<AppDiagnosticsStoreModule> {
    const baseUrl = !env.production ? 'ws://localhost:8081/api' : 'wss://us-central1-nx-ng-starter.cloudfunctions.net';
    const wsConfig: IWebsocketConfig = {
      url: `${baseUrl}/events`,
    };
    return {
      ngModule: AppDiagnosticsStoreModule,
      providers: [
        AppDiagnosticsReducer.provider,
        {
          provide: WS_CONFIG,
          useValue: wsConfig,
        },
      ],
    };
  }
}

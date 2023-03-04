import { ModuleWithProviders, NgModule } from '@angular/core';
import { IWebClientAppEnvironment } from '@app/client-util';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppDiagnosticsEffects } from './diagnostics.effects';
import { diagnosticsReducerConfig, IDiagnosticsState, IWebsocketConfig, WS_CONFIG } from './diagnostics.interface';
import { diagnosticsReducerProvider } from './diagnostics.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature<IDiagnosticsState>(diagnosticsReducerConfig.featureName, diagnosticsReducerConfig.token),
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
        diagnosticsReducerProvider,
        {
          provide: WS_CONFIG,
          useValue: wsConfig,
        },
      ],
    };
  }
}

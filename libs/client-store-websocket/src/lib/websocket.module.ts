import { ModuleWithProviders, NgModule } from '@angular/core';
import { IWebClientAppEnvironment } from '@app/client-util';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppWebsocketEffects } from './websocket.effects';
import { featureName, IWebsocketState, WS_CONFIG } from './websocket.interface';
import { AppWebsocketReducer } from './websocket.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature<IWebsocketState>(featureName, AppWebsocketReducer.token),
    EffectsModule.forFeature([AppWebsocketEffects]),
  ],
})
export class AppWebsocketStoreModule {
  public static forRoot(env: IWebClientAppEnvironment): ModuleWithProviders<AppWebsocketStoreModule> {
    return {
      ngModule: AppWebsocketStoreModule,
      providers: [
        AppWebsocketReducer.provider,
        {
          provide: WS_CONFIG,
          useValue: {
            url: !env.production ? 'ws://localhost:8081/api/events' : 'wss://us-central1-nx-ng-starter.cloudfunctions.net/events',
          },
        },
      ],
    };
  }
}

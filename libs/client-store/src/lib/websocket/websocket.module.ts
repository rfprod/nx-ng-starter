import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { IWebClientAppEnvironment } from '@nx-ng-starter/client-util';

import { WS_CONFIG } from './websocket.interface';
import { AppWebsocketState } from './websocket.store';

@NgModule({
  imports: [NgxsModule.forFeature([AppWebsocketState])],
})
export class AppWebsocketStoreModule {
  public static forRoot(env: IWebClientAppEnvironment): ModuleWithProviders<AppWebsocketStoreModule> {
    return {
      ngModule: AppWebsocketStoreModule,
      providers: [
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

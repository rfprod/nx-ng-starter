import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { IWebClientAppEnvironment } from '@nx-ng-starter/client-util';

import { websocketApiServiceProvider } from './websocket-api.service';
import { WS_CONFIG } from './websocket.interface';
import { websocketServiceProvider } from './websocket.service';
import { AppWebsocketState } from './websocket.store';

export const websocketModuleProviders: Provider[] = [
  websocketApiServiceProvider,
  websocketServiceProvider,
];

@NgModule({
  imports: [NgxsModule.forFeature([AppWebsocketState])],
})
export class AppWebsocketModule {
  public static forRoot(env: IWebClientAppEnvironment): ModuleWithProviders<AppWebsocketModule> {
    return {
      ngModule: AppWebsocketModule,
      providers: [
        {
          provide: WS_CONFIG,
          useValue: {
            url: !env.production
              ? 'ws://localhost:8081/api/events'
              : 'wss://us-central1-nx-ng-starter.cloudfunctions.net/events',
          },
        },
      ],
    };
  }
}

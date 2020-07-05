import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AppWebEnvironment } from '@nx-ng-starter/shared-core/interfaces';

import { websocketApiServiceProvider } from './websocket-api.service';
import { WS_CONFIG } from './websocket.interface';
import { websocketServiceProvider } from './websocket.service';
import { WebsocketState } from './websocket.store';

export const websocketModuleProviders: Provider[] = [
  websocketApiServiceProvider,
  websocketServiceProvider,
];

@NgModule({
  imports: [NgxsModule.forFeature([WebsocketState])],
})
export class WebsocketModule {
  public static forRoot(env: AppWebEnvironment): ModuleWithProviders<WebsocketModule> {
    return {
      ngModule: WebsocketModule,
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

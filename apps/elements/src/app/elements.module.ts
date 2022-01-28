import { CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, NgModule, Provider } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppClientChatbotModule } from '@app/client-chatbot';
import { AppClientCoreModule } from '@app/client-core';
import { AppClientGqlModule } from '@app/client-gql';
import { AppClientMaterialModule } from '@app/client-material';
import { AppWebsocketStoreModule } from '@app/client-store-websocket';
import { AppClientTranslateModule } from '@app/client-translate';
import { EntityServiceClient } from '@app/proto';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../environments/environment';
import { AppElementsService } from './services/elements.service';

export const grpcProviders: Provider[] = [
  {
    provide: EntityServiceClient,
    useFactory: () => new EntityServiceClient(environment.envoyUrl ?? '', null, { withCredentials: 'true' }),
  },
];

/**
 * Application root module.
 */
@NgModule({
  imports: [
    BrowserAnimationsModule,
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    NgxsLoggerPluginModule.forRoot({ disabled: environment.production, collapsed: true }),
    NgxsRouterPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppClientCoreModule.forRoot(environment),
    AppClientMaterialModule.forRoot(),
    AppClientTranslateModule.forRoot(),
    AppClientGqlModule.forRoot(environment),
    AppWebsocketStoreModule.forRoot(environment),
    RouterModule.forRoot([]),
    AppClientChatbotModule,
  ],
  providers: [...grpcProviders],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppElementsModule implements DoBootstrap {
  constructor(private readonly service: AppElementsService) {}

  public ngDoBootstrap() {
    this.service.registerElements();
  }
}

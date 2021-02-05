import {
  CUSTOM_ELEMENTS_SCHEMA,
  DoBootstrap,
  Inject,
  Injector,
  NgModule,
  Provider,
} from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppChatbotRootComponent, AppClientChatbotModule } from '@nx-ng-starter/client-chatbot';
import { AppClientCoreModule } from '@nx-ng-starter/client-core';
import { AppClientGqlModule } from '@nx-ng-starter/client-gql';
import { AppClientMaterialModule } from '@nx-ng-starter/client-material';
import { AppWebsocketModule } from '@nx-ng-starter/client-store';
import { AppClientTranslateModule } from '@nx-ng-starter/client-translate';
import { WINDOW } from '@nx-ng-starter/client-util';
import { EntityServiceClient } from '@nx-ng-starter/proto';

import { environment } from '../environments/environment';

export const grpcProviders: Provider[] = [
  {
    provide: EntityServiceClient,
    useFactory: () =>
      new EntityServiceClient(environment.envoyUrl ?? '', null, { withCredentials: 'true' }),
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
    AppWebsocketModule.forRoot(environment),
    RouterModule.forRoot([]),
    AppClientChatbotModule,
  ],
  providers: [...grpcProviders],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppElementsModule implements DoBootstrap {
  constructor(
    private readonly injector: Injector,
    @Inject(WINDOW) private readonly window: Window,
  ) {}

  public ngDoBootstrap() {
    this.registerChatbotWidget();
  }

  private registerChatbotWidget(): void {
    const chatbotWidget = createCustomElement<AppChatbotRootComponent>(AppChatbotRootComponent, {
      injector: this.injector,
    });
    if (!Boolean(this.window.customElements.get('app-chatbot-root'))) {
      this.window.customElements.define('app-chatbot-root', chatbotWidget);
    }
  }
}

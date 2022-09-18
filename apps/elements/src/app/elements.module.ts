import { CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppChatbotModule } from '@app/client-chatbot';
import { AppCoreModule } from '@app/client-core';
import { AppGqlModule } from '@app/client-gql';
import { AppMaterialModule } from '@app/client-material';
import { AppRouterStoreModule } from '@app/client-store-router';
import { AppWebsocketStoreModule } from '@app/client-store-websocket';
import { AppTranslateModule } from '@app/client-translate';
import { AppElizaModule } from '@app/client-util-eliza';
import { metaReducers } from '@app/client-util-ngrx';
import { sentryProviders } from '@app/client-util-sentry';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { environment } from '../environments/environment';
import { AppElementsService } from './services/elements.service';

/**
 * The elements application root module.
 */
@NgModule({
  imports: [
    BrowserAnimationsModule,
    StoreModule.forRoot({}, { metaReducers: metaReducers(environment.production) }),
    EffectsModule.forRoot(),
    AppWebsocketStoreModule.forRoot(environment),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppCoreModule.forRoot(environment),
    AppMaterialModule.forRoot(),
    AppTranslateModule.forRoot(),
    AppGqlModule.forRoot(environment),
    AppElizaModule.forRoot(),
    AppChatbotModule,
    RouterModule.forRoot([]),
    AppRouterStoreModule.forRoot(),
  ],
  providers: [...sentryProviders(environment)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppElementsModule implements DoBootstrap {
  constructor(private readonly service: AppElementsService) {}

  public ngDoBootstrap() {
    this.service.registerElements();
  }
}

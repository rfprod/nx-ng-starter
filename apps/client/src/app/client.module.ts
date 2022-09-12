import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppClientCoreModule } from '@app/client-core';
import { AppClientCoreComponentsModule } from '@app/client-core-components';
import { AppClientGqlModule } from '@app/client-gql';
import { AppClientGrpcModule, AppClientGrpcService } from '@app/client-grpc';
import { AppClientMaterialModule } from '@app/client-material';
import { AppClientPwaOfflineModule } from '@app/client-pwa-offline';
import { AppRouterStoreModule } from '@app/client-store-router';
import { AppWebsocketStoreModule } from '@app/client-store-websocket';
import { AppClientTranslateModule } from '@app/client-translate';
import { AppClientUtilElizaModule } from '@app/client-util-eliza';
import { metaReducers } from '@app/client-util-ngrx';
import { sentryProviders } from '@app/client-util-sentry';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { environment } from '../environments/environment';
import { AppClientRoutingModule } from './client-routing.module';
import { AppRootComponent } from './components/root.component';

/**
 * The client application root module.
 */
@NgModule({
  imports: [
    BrowserAnimationsModule,
    StoreModule.forRoot({}, { metaReducers: metaReducers(environment.production) }),
    EffectsModule.forRoot(),
    AppWebsocketStoreModule.forRoot(environment),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppClientCoreModule.forRoot(environment),
    AppClientCoreComponentsModule,
    AppClientMaterialModule.forRoot(),
    AppClientTranslateModule.forRoot(),
    AppClientGqlModule.forRoot(environment),
    AppClientGrpcModule.forRoot(environment),
    AppClientUtilElizaModule.forRoot(),
    AppClientPwaOfflineModule,
    AppClientRoutingModule,
    AppRouterStoreModule.forRoot(),
  ],
  providers: [...sentryProviders(environment)],
  declarations: [AppRootComponent],
  bootstrap: [AppRootComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppClientModule {
  constructor(private readonly grpc: AppClientGrpcService) {
    void this.grpc.getEntityById().subscribe();
  }
}

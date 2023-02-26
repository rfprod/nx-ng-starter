import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppCoreModule } from '@app/client-core';
import { AppCoreComponentsModule } from '@app/client-core-components';
import { AppGqlModule } from '@app/client-gql';
import { AppGrpcModule, AppGrpcService } from '@app/client-grpc';
import { AppMaterialModule } from '@app/client-material';
import { AppPwaOfflineModule } from '@app/client-pwa-offline';
import { AppDiagnosticsStoreModule, diagnosticsActions, IDiagnosticsState } from '@app/client-store-diagnostics';
import { AppRouterStoreModule } from '@app/client-store-router';
import { AppTranslateModule } from '@app/client-translate';
import { AppElizaModule } from '@app/client-util-eliza';
import { metaReducers } from '@app/client-util-ngrx';
import { sentryProviders } from '@app/client-util-sentry';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

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
    AppDiagnosticsStoreModule.forRoot(environment),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' }),
    AppCoreModule.forRoot(environment),
    AppCoreComponentsModule,
    AppMaterialModule.forRoot(),
    AppTranslateModule.forRoot(),
    AppGqlModule.forRoot(environment),
    AppGrpcModule.forRoot(environment),
    AppElizaModule.forRoot(),
    AppPwaOfflineModule,
    AppClientRoutingModule,
    AppRouterStoreModule.forRoot(),
  ],
  providers: [...sentryProviders(environment)],
  declarations: [AppRootComponent],
  bootstrap: [AppRootComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppClientModule {
  constructor(private readonly grpc: AppGrpcService, private readonly store: Store<IDiagnosticsState>) {
    void this.grpc.getEntityById().subscribe();
    this.store.dispatch(diagnosticsActions.connect());
  }
}

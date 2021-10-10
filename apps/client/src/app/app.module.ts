import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppClientComponentsModule } from '@app/client-components';
import { AppClientCoreModule } from '@app/client-core';
import { AppClientGqlModule } from '@app/client-gql';
import { AppClientGrpcModule, AppClientGrpcService } from '@app/client-grpc';
import { AppClientMaterialModule } from '@app/client-material';
import { AppUserState, AppWebsocketStoreModule } from '@app/client-store';
import { AppClientTranslateModule } from '@app/client-translate';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppRootComponent } from './components/root.component';

/**
 * Application root module.
 */
@NgModule({
  imports: [
    BrowserAnimationsModule,
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    NgxsStoragePluginModule.forRoot({
      key: [AppUserState],
    }),
    NgxsLoggerPluginModule.forRoot({ disabled: environment.production, collapsed: true }),
    NgxsRouterPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppClientCoreModule.forRoot(environment),
    AppClientMaterialModule.forRoot(),
    AppWebsocketStoreModule.forRoot(environment),
    AppClientTranslateModule.forRoot(),
    AppClientGqlModule.forRoot(environment),
    AppClientComponentsModule,
    AppClientGrpcModule.forRoot(environment),
    AppRoutingModule,
  ],
  declarations: [AppRootComponent],
  bootstrap: [AppRootComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor(private readonly grpc: AppClientGrpcService) {
    void this.grpc.getEntityById().subscribe();
  }
}

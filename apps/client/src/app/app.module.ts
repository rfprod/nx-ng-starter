import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Provider } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppClientComponentsModule } from '@nx-ng-starter/client-components';
import { AppClientCoreModule } from '@nx-ng-starter/client-core';
import { AppClientGqlModule } from '@nx-ng-starter/client-gql';
import { AppClientMaterialModule } from '@nx-ng-starter/client-material';
import { AppWebsocketModule } from '@nx-ng-starter/client-store';
import { AppClientTranslateModule } from '@nx-ng-starter/client-translate';
import { EntityServiceClient } from '@nx-ng-starter/proto';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppRootComponent } from './components/root.component';

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
    AppWebsocketModule.forRoot(environment),
    AppClientTranslateModule.forRoot(),
    AppClientGqlModule.forRoot(environment),
    AppClientComponentsModule,
    AppRoutingModule,
  ],
  providers: [...grpcProviders],
  declarations: [AppRootComponent],
  bootstrap: [AppRootComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

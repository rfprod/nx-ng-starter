import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { EntityServiceClient } from '@nx-ng-starter/proto';
import { AppSharedCoreModule } from '@nx-ng-starter/shared-core';
import { WebsocketModule } from '@nx-ng-starter/shared-store/state/websocket';
import { AppMaterialModule } from 'libs/shared-ui/src/lib';

import { httpProgressServiceProvider } from '../../../../libs/shared-store/src/lib/state/http-progress/http-progress.service';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppIndexApiComponent } from './components/app-index/api/app-index-api.component';
import { AppIndexHomeComponent } from './components/app-index/home/app-index-home.component';
import { AppIndexComponent } from './components/app-index/index/app-index.component';
import { AppComponent } from './components/app/app.component';

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
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    NgxsLoggerPluginModule.forRoot({ disabled: environment.production, collapsed: true }),
    NgxsRouterPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    AppSharedCoreModule.forRoot(environment),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppMaterialModule.forRoot(),
    WebsocketModule.forRoot(environment),
  ],
  providers: [...grpcProviders, httpProgressServiceProvider],
  declarations: [AppComponent, AppIndexComponent, AppIndexHomeComponent, AppIndexApiComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}

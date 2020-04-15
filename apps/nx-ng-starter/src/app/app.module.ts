import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { EntityServiceClient } from '@nx-ng-starter/proto';
import { SharedCoreModule } from '@nx-ng-starter/shared-core';
import { WINDOW, getWindow } from '@nx-ng-starter/shared-core/util';
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
      new EntityServiceClient(environment.envoyUrl, null, { withCredentials: 'true' }),
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
    NgxsFormPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    SharedCoreModule.forRoot(environment),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    { provide: WINDOW, useFactory: getWindow },
    {
      provide: APP_BASE_HREF,
      useValue: '/',
    },
    ...grpcProviders,
  ],
  declarations: [AppComponent, AppIndexComponent, AppIndexHomeComponent, AppIndexApiComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}

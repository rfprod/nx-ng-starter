import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { APP_BASE_HREF } from '@angular/common';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';

import { SharedCoreModule } from '@nx-ng-starter/shared-core';

import { AppRoutingModule } from './app-routing.module';

import { AppIndexApiComponent } from './components/app-index/api/app-index-api.component';
import { AppIndexComponent } from './components/app-index/app-index.component';
import { AppIndexHomeComponent } from './components/app-index/home/app-index-home.component';
import { AppComponent } from './components/app/app.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

/**
 * Application root module.
 */
@NgModule({
  imports: [
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    NgxsLoggerPluginModule.forRoot({ disabled: environment.production, collapsed: true }),
    NgxsFormPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    SharedCoreModule.forRoot(environment),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/',
    },
  ],
  declarations: [AppComponent, AppIndexComponent, AppIndexHomeComponent, AppIndexApiComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}

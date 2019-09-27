import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { APP_BASE_HREF } from '@angular/common';

import { SharedCoreModule } from '@nx-ng-starter/shared-core';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';

import { AppIndexComponent } from './components/app-index/app-index.component';
import { AppComponent } from './components/app/app.component';

import { environment } from '../environments/environment';

/**
 * Application root module.
 */
@NgModule({
  imports: [
    SharedCoreModule.forRoot(),
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    NgxsLoggerPluginModule.forRoot({ disabled: environment.production, collapsed: true }),
    NgxsFormPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/',
    },
  ],
  declarations: [AppComponent, AppIndexComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}

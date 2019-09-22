import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule
} from '@angular/core';

import {
  APP_BASE_HREF
} from '@angular/common';

import { SharedCoreModule } from '@nx-ng-starter/shared-core';

import { AppRoutingModule } from './app-routing.module';

import { AppIndexComponent } from './components/app-index/app-index.component';
import { AppComponent } from './components/app/app.component';

/**
 * Application root module.
 */
@NgModule({
  imports: [
    SharedCoreModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/',
    },
  ],
  declarations: [
    AppComponent,
    AppIndexComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}

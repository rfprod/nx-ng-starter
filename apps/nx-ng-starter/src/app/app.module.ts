import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import {
  APP_BASE_HREF
} from '@angular/common';

import { SharedCoreModule } from '@nx-ng-starter/shared-core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/app/app.component';
import { AppIndexComponent } from './components/app-index/app-index.component';

/**
 * Application root module.
 */
@NgModule({
  imports: [
    SharedCoreModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    }
  ],
  declarations: [
    AppComponent,
    AppIndexComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}

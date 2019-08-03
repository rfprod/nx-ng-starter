import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import {
  APP_BASE_HREF,
  LocationStrategy,
  PathLocationStrategy
} from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import 'node_modules/hammerjs/hammer.js';
import { CustomMaterialModule } from '@nx-ng-starter/shared-core/ui';

import {
  EventEmitterService,
  MarkdownService
} from '@nx-ng-starter/shared-core/data-access';

import { AppComponent } from './components/app/app.component';
import { AppIndexComponent } from './components/app-index/app-index.component';
import { CustomButtonDemoComponent } from './components/custom-button-demo/custom-button-demo.component';

/**
 * Main application module.
 */
@NgModule({
  declarations: [
    AppComponent,
    AppIndexComponent,
    CustomButtonDemoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: 'Window', useValue: window },
    EventEmitterService,
    MarkdownService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

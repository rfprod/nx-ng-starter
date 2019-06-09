import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { FlexLayoutModule } from '@angular/flex-layout';
// import 'node_modules/hammerjs/hammer.js';
import { CustomMaterialModule } from 'libs/ui/common/custom-material/custom-material.module';

import { EventEmitterService } from 'libs/data-access/event-emitter/event-emitter.service';
import { MarkdownService } from 'libs/data-access/markdown/markdown.service';

import { CustomButtonComponent } from 'libs/ui/common/custom-button/custom-button.component';

import { AppComponent } from './components/app/app.component';
import { AppIndexComponent } from './components/app-index/app-index.component';
import { CustomButtonDemoComponent } from './components/custom-button-demo/custom-button-demo.component';

/**
 * Main application module.
 */
@NgModule({
  declarations: [
    AppComponent, AppIndexComponent, CustomButtonComponent, CustomButtonDemoComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FlexLayoutModule, CustomMaterialModule,
    FormsModule, ReactiveFormsModule, HttpModule, AppRoutingModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' }, { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: 'Window', useValue: window }, EventEmitterService, MarkdownService
  ],
  schemas  : [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

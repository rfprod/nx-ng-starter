import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';

import { SharedCoreModule } from '@nx-ng-starter/shared-core';

import { AppIndexApiComponent } from './app-index-api.component';

describe('AppIndexApiComponent', () => {
  let fixture: ComponentFixture<AppIndexApiComponent>;
  let component: AppIndexApiComponent | any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppIndexApiComponent],
      imports: [
        NgxsModule.forRoot([], { developmentMode: true }),
        NgxsLoggerPluginModule.forRoot({ disabled: true, collapsed: true }),
        NgxsFormPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        SharedCoreModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '', component: AppIndexApiComponent },
          { path: '', redirectTo: '', pathMatch: 'full' },
          { path: '**', redirectTo: '' },
        ]),
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/',
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppIndexApiComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});

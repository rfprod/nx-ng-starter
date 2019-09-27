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

import { AppComponent } from './app.component';

import { AppIndexComponent } from '../app-index/app-index.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent | any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, AppIndexComponent],
      imports: [
        NgxsModule.forRoot([], { developmentMode: true }),
        NgxsLoggerPluginModule.forRoot({ disabled: true, collapsed: true }),
        NgxsFormPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        SharedCoreModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '', component: AppIndexComponent },
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
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
      });
  }));
  it('should be defined', async(() => {
    expect(component).toBeDefined();
  }));
  it('should have as title "Components library"', async(() => {
    expect(component.title).toEqual('Components library');
  }));
  it('should should render two toolbars', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('mat-toolbar').length).toEqual(1 + 1);
  }));
});

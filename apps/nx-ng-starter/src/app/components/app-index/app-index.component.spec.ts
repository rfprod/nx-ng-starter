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

import { AppIndexComponent } from './app-index.component';

import { MarkdownService } from '@nx-ng-starter/shared-core/data-access';

describe('AppIndexComponent', () => {
  let fixture: ComponentFixture<AppIndexComponent>;
  let component: AppIndexComponent | any;
  let service: MarkdownService;
  let spy: {
    service: {
      process: jest.SpyInstance;
    };
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppIndexComponent],
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
        fixture = TestBed.createComponent(AppIndexComponent);
        component = fixture.debugElement.componentInstance;
        service = TestBed.get(MarkdownService);
        spy = {
          service: {
            process: jest
              .spyOn(service, 'process')
              .mockImplementation((input: string) => `marked ${input}`),
          },
        };
        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should have as title "Components library directory", and should call markdown service process method on creation', () => {
    expect(component.title).toEqual('Components library directory');
    expect(spy.service.process.mock.calls.length).toBeGreaterThan(0);
  });
});

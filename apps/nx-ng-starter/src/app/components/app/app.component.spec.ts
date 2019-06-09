import { TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FlexLayoutModule } from '@angular/flex-layout';
import 'node_modules/hammerjs/hammer.js';
import { CustomMaterialModule } from 'libs/ui/common/custom-material/custom-material.module';

import { EventEmitterService } from 'libs/data-access/event-emitter/event-emitter.service';

import { AppIndexComponent } from '../app-index/app-index.component';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, AppIndexComponent ],
      imports: [
        BrowserDynamicTestingModule, NoopAnimationsModule, FormsModule, ReactiveFormsModule,
        CustomMaterialModule, FlexLayoutModule, RouterTestingModule.withRoutes([
          { path: 'index', component: AppIndexComponent },
          { path: '', redirectTo: 'index', pathMatch: 'full' },
          { path: '**', redirectTo: 'index' }
        ])
      ],
      providers: [
        { provide: 'Window', useValue: window },
        EventEmitterService,
        MockBackend,
        {
          provide: Http,
          useFactory: (mockedBackend, requestOptions) => new Http(mockedBackend, requestOptions),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents().then(() => {
      this.fixture = TestBed.createComponent(AppComponent);
      this.component = this.fixture.componentInstance;
    });
  }));
  it('should be defined', async(() => {
    expect(this.component).toBeDefined();
  }));
  it(`should have as title 'Components library'`, async(() => {
    expect(this.component.title).toEqual('Components library');
  }));
  it('should should render two toolbars', async(() => {
    this.fixture.detectChanges();
    const compiled = this.fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('mat-toolbar').length).toEqual(2);
  }));
});

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
import { MarkdownService } from 'libs/data-access/markdown/markdown.service';

import { AppIndexComponent } from './app-index.component';

describe('AppIndexComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppIndexComponent ],
      imports: [
        BrowserDynamicTestingModule, NoopAnimationsModule, FormsModule, ReactiveFormsModule,
        CustomMaterialModule, FlexLayoutModule, RouterTestingModule
      ],
      providers: [
        { provide: 'Window', useValue: window },
        EventEmitterService,
        MockBackend,
        MarkdownService,
        {
          provide: Http,
          useFactory: (mockedBackend, requestOptions) => new Http(mockedBackend, requestOptions),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents().then(() => {
      this.fixture = TestBed.createComponent(AppIndexComponent);
      this.component = this.fixture.componentInstance;
      this.window = TestBed.get('Window') as Window;
      this.window.marked = () => true;
    });
  }));

  it('should be defined', async(() => {
    expect(this.component).toBeDefined();
  }));

  it(`should have as title 'Components library directory'`, async(() => {
    expect(this.component.title).toEqual('Components library directory');
  }));

  it('should render title in a h1 tag', async(() => {
    this.fixture.detectChanges();
    const compiled = this.fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Components library directory');
  }));

});

import { TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import 'node_modules/hammerjs/hammer.js';
import { CustomMaterialModule } from 'libs/ui/common/custom-material/custom-material.module';

import { EventEmitterService } from 'libs/data-access/event-emitter/event-emitter.service';

import { CustomButtonDemoComponent } from './custom-button-demo.component';

describe('CustomButtonDemoComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomButtonDemoComponent ],
      imports: [
        BrowserDynamicTestingModule, NoopAnimationsModule, FormsModule, ReactiveFormsModule, CustomMaterialModule, FlexLayoutModule
      ],
      providers: [
        { provide: 'Window', useValue: window },
        EventEmitterService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents().then(() => {
      this.fixture = TestBed.createComponent(CustomButtonDemoComponent);
      this.component = this.fixture.componentInstance;
    });
  }));

  it('should be defined', () => {
    expect(this.component).toBeDefined();
  });

});

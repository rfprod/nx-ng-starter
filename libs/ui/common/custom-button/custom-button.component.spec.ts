import { TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import 'node_modules/hammerjs/hammer.js';
import { CustomMaterialModule } from 'libs/ui/common/custom-material/custom-material.module';

import { CustomButtonComponent } from './custom-button.component';

describe('CustomButtonComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomButtonComponent ],
      imports: [
        BrowserDynamicTestingModule, NoopAnimationsModule, CustomMaterialModule, FlexLayoutModule
      ],
      providers: [
        { provide: 'Window', useValue: window }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents().then(() => {
      this.fixture = TestBed.createComponent(CustomButtonComponent);
      this.component = this.fixture.componentInstance;
    });
  }));

  it('should be defined', () => {
    expect(this.component).toBeDefined();
  });

});

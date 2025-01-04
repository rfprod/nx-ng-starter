import { Injector } from '@angular/core';
import { TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { newTestBedMetadata } from '@app/client-testing-unit';
import { WINDOW, windowProvider } from '@app/client-util';

import { AppElementsService } from './elements.service';

describe('AppElementsService', () => {
  const testBedConfig: TestModuleMetadata = newTestBedMetadata({
    providers: [Injector, windowProvider],
  });

  let service: AppElementsService;

  let win: Window;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    service = TestBed.inject(AppElementsService);
    win = TestBed.inject(WINDOW);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('registerElements should register all custom web elements', () => {
    service.registerElements();
    const chatbotWidget = win.customElements.get('app-chatbot-root');
    expect(chatbotWidget).not.toBeUndefined();
  });
});

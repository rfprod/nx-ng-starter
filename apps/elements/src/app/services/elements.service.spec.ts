import { Injector } from '@angular/core';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { WINDOW, windowProvider } from '@app/client-util';

import { AppElementsService } from './elements.service';

describe('AppElementsService', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    providers: [Injector, windowProvider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let service: AppElementsService;

  let win: Window;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        service = TestBed.inject(AppElementsService);
        win = TestBed.inject(WINDOW);
      });
  }));

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('registerElements should register all custom web elements', () => {
    service.registerElements();
    const chatbotWidget = win.customElements.get('app-chatbot-root');
    expect(chatbotWidget).not.toBeUndefined();
  });
});

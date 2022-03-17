import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';

import { WINDOW, windowProvider } from './window.provider';

describe('windowProvider', () => {
  const testBedConfig: TestModuleMetadata = {
    providers: [windowProvider],
  };

  let provider: Window;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        provider = TestBed.inject(WINDOW);
      });
  }));

  it('should be defined', () => {
    expect(provider).toBeDefined();
    expect(provider).toEqual(window);
  });
});

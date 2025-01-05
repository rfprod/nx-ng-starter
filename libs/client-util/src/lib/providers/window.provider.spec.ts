import { TestBed, type TestModuleMetadata } from '@angular/core/testing';

import { WINDOW, windowProvider } from './window.provider';

describe('windowProvider', () => {
  const testBedConfig: TestModuleMetadata = {
    providers: [windowProvider],
  };

  let provider: Window;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    provider = TestBed.inject(WINDOW);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
    expect(provider).toEqual(window);
  });
});

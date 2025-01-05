import { TestBed, type TestModuleMetadata } from '@angular/core/testing';

import { NAVIGATOR, navigatorProvider } from './navigator.provider';

describe('navigatorFactory', () => {
  const testBedConfig: TestModuleMetadata = {
    providers: [navigatorProvider],
  };

  let provider: Navigator;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    provider = TestBed.inject(NAVIGATOR);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
    expect(provider).toEqual(window.navigator);
  });
});

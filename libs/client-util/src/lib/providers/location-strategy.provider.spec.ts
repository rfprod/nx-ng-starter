import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { TestBed, type TestModuleMetadata } from '@angular/core/testing';

import { appBaseHrefProvider } from './app-base-href.provider';
import { pathLocationStrategyProvider } from './location-strategy.provider';

describe('pathLocationStrategyProvider', () => {
  const testBedConfig: TestModuleMetadata = {
    providers: [pathLocationStrategyProvider, appBaseHrefProvider],
  };

  let provider: LocationStrategy;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    provider = TestBed.inject(LocationStrategy);
  });

  it('should be defined', () => {
    expect(provider instanceof PathLocationStrategy).toBeTruthy();
  });
});

import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';

import { appBaseHrefProvider } from './app-base-href.provider';
import { pathLocationStrategyProvider } from './location-strategy.provider';

describe('pathLocationStrategyProvider', () => {
  const testBedConfig: TestModuleMetadata = {
    providers: [pathLocationStrategyProvider, appBaseHrefProvider],
  };

  let provider: LocationStrategy;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        provider = TestBed.inject(LocationStrategy);
      });
  }));

  it('should be defined', () => {
    expect(provider instanceof PathLocationStrategy).toBeTruthy();
  });
});

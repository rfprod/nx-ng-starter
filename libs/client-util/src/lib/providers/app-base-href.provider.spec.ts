import { APP_BASE_HREF } from '@angular/common';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';

import { appBaseHrefProvider } from './app-base-href.provider';

describe('appBaseHrefProvider', () => {
  const testBedConfig: TestModuleMetadata = {
    providers: [appBaseHrefProvider],
  };

  let provider: string;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        provider = TestBed.inject(APP_BASE_HREF);
      });
  }));

  it('should be defined', () => {
    expect(provider).toEqual('/');
  });
});

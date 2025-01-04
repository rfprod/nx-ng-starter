import { APP_BASE_HREF } from '@angular/common';
import { TestBed, type TestModuleMetadata } from '@angular/core/testing';

import { appBaseHrefProvider } from './app-base-href.provider';

describe('appBaseHrefProvider', () => {
  const testBedConfig: TestModuleMetadata = {
    providers: [appBaseHrefProvider],
  };

  let provider: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    provider = TestBed.inject(APP_BASE_HREF);
  });

  it('should be defined', () => {
    expect(provider).toEqual('/');
  });
});

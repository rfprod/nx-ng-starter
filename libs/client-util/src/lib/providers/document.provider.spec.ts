import { DOCUMENT } from '@angular/common';
import { TestBed, type TestModuleMetadata } from '@angular/core/testing';

import { documentProvider } from './document.provider';

describe('documentProvider', () => {
  const testBedConfig: TestModuleMetadata = {
    providers: [documentProvider],
  };

  let provider: Document;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    provider = TestBed.inject(DOCUMENT);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
    expect(provider).toEqual(document);
  });
});

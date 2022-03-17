import { DOCUMENT } from '@angular/common';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';

import { documentProvider } from './document.provider';

describe('documentProvider', () => {
  const testBedConfig: TestModuleMetadata = {
    providers: [documentProvider],
  };

  let provider: Document;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        provider = TestBed.inject(DOCUMENT);
      });
  }));

  it('should be defined', () => {
    expect(provider).toBeDefined();
    expect(provider).toEqual(document);
  });
});

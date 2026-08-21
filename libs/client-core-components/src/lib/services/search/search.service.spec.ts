import { TestBed, type TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { newTestBedMetadata } from '@app/client-testing-unit';

import { AppSearchService } from './search.service';

describe('AppSearchService', () => {
  const testBedConfig: TestModuleMetadata = newTestBedMetadata({
    providers: [AppSearchService],
  });

  let service: AppSearchService;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        service = TestBed.inject(AppSearchService);
      });
  }));

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

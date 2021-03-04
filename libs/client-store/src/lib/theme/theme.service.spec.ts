import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@nx-ng-starter/client-unit-testing';

import { AppThemeService } from './theme.service';

describe('AppThemeService', () => {
  let service: AppThemeService;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({});
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          service = TestBed.inject(AppThemeService);
        });
    }),
  );

  it('should be created', () => {
    expect(service).toBeDefined();
  });
});

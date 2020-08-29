import { async, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@nx-ng-starter/mocks-core';

import { AppSidebarUiModule } from './sidebar-ui.module';
import { AppSidebarUiService } from './sidebar-ui.service';

describe('AppSidebarUiService', () => {
  let service: AppSidebarUiService;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [AppSidebarUiModule],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(async(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        service = TestBed.inject(AppSidebarUiService);
      });
  }));

  it('should be created', () => {
    expect(service).toBeDefined();
  });
});

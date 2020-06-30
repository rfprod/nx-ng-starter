import { async, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@nx-ng-starter/mocks-core';

import { SidebarUiService } from './sidebar-ui.service';

describe('SidebarUiService', () => {
  let service: SidebarUiService;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({});
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(async(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        service = TestBed.inject(SidebarUiService);
      });
  }));

  it('should be created', () => {
    expect(service).toBeDefined();
  });
});

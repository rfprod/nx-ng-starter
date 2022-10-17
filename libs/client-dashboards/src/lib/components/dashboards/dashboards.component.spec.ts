import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';

import { AppDashboardsComponent } from './dashboards.component';

describe('AppDashboardsComponent', () => {
  let component: AppDashboardsComponent;
  let fixture: ComponentFixture<AppDashboardsComponent>;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppDashboardsComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppDashboardsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

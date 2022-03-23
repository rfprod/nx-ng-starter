import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { D3_CHART_FACTORY } from '../../providers/d3-chart-factory.provider';
import { AppLineChartComponent } from './line-chart.component';

describe('AppLineChartComponent', () => {
  const testBedConfig: TestModuleMetadata = {
    imports: [NoopAnimationsModule, BrowserDynamicTestingModule],
    declarations: [AppLineChartComponent],
    providers: [
      {
        provide: DOCUMENT,
        useValue: document,
      },
      {
        provide: D3_CHART_FACTORY,
      },
    ],
  };

  let fixture: ComponentFixture<AppLineChartComponent>;
  let component: AppLineChartComponent;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppLineChartComponent);
        component = fixture.debugElement.componentInstance;

        // fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  test.todo('AppLineChartComponent');
});

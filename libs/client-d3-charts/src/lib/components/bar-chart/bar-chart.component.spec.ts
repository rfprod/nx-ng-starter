import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { D3_CHART_FACTORY } from '../../providers/d3-chart-factory.provider';
import { AppBarChartComponent } from './bar-chart.component';

describe('AppBarChartComponent', () => {
  const testBedConfig: TestModuleMetadata = {
    imports: [NoopAnimationsModule, BrowserDynamicTestingModule],
    declarations: [AppBarChartComponent],
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

  let fixture: ComponentFixture<AppBarChartComponent>;
  let component: AppBarChartComponent;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppBarChartComponent);
        component = fixture.debugElement.componentInstance;

        // fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  test.todo('AppBarChartComponent');
});

import { DOCUMENT } from '@angular/common';
import { type ComponentFixture, TestBed, type TestModuleMetadata } from '@angular/core/testing';

import { D3_CHART_FACTORY } from '../../providers/d3-chart-factory.provider';
import { AppGaugeChartComponent } from './gauge-chart.component';

describe('AppPieChartComponent', () => {
  const testBedConfig: TestModuleMetadata = {
    declarations: [AppGaugeChartComponent],
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

  let fixture: ComponentFixture<AppGaugeChartComponent>;
  let component: AppGaugeChartComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppGaugeChartComponent);
    component = fixture.debugElement.componentInstance;

    // fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  test.todo('AppGaugeChartComponent');
});

import { type ComponentFixture, TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import type { IGaugeChartOptions } from '../../interfaces/gauge-chart.interface';
import { AppChartExamplesGaugeComponent } from './chart-examples-gauge.component';

describe('AppChartExamplesGaugeComponent', () => {
  const testBedConfig: TestModuleMetadata = {
    declarations: [AppChartExamplesGaugeComponent],
  };

  let fixture: ComponentFixture<AppChartExamplesGaugeComponent>;
  let component: AppChartExamplesGaugeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppChartExamplesGaugeComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('the chart options should have expected structure', async () => {
    const config = await firstValueFrom(component.chartConfig$);
    expect(config.options).toEqual({
      first: {
        chartTitle: 'Example gauge chart 1',
      } as Partial<IGaugeChartOptions>,
      second: {
        chartTitle: 'Example gauge chart 2',
        showLabels: false,
      } as Partial<IGaugeChartOptions>,
      third: {
        chartTitle: 'Example gauge chart 3',
        showLabels: false,
        showTooltips: false,
        defaultColor: 'red',
      } as Partial<IGaugeChartOptions>,
      fourth: {
        chartTitle: 'Example gauge chart 2',
        showLabels: false,
        valueFontSize: 30,
        padRad: 0,
      } as Partial<IGaugeChartOptions>,
    });
  });
});

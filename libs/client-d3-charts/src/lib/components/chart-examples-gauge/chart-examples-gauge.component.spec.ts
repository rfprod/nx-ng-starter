import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { IGaugeChartOptions } from '../../interfaces/gauge-chart.interface';
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
    const config = await firstValueFrom(component.gaugeChartConfig$);
    expect(config.options).toEqual({
      first: <Partial<IGaugeChartOptions>>{
        chartTitle: 'Example gauge chart 1',
      },
      second: <Partial<IGaugeChartOptions>>{
        chartTitle: 'Example gauge chart 2',
        showLabels: false,
      },
      third: <Partial<IGaugeChartOptions>>{
        chartTitle: 'Example gauge chart 3',
        showLabels: false,
        showTooltips: false,
        defaultColor: 'red',
      },
    });
  });
});

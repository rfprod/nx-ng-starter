import { type ComponentFixture, TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import type { IPieChartOptions } from '../../interfaces/pie-chart.interface';
import { AppChartExamplesPieComponent } from './chart-examples-pie.component';

describe('AppChartExamplesPieComponent', () => {
  const testBedConfig: TestModuleMetadata = {
    declarations: [AppChartExamplesPieComponent],
  };

  let fixture: ComponentFixture<AppChartExamplesPieComponent>;
  let component: AppChartExamplesPieComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppChartExamplesPieComponent);
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
        chartTitle: 'Example pie chart 1',
      } as Partial<IPieChartOptions>,
      second: {
        chartTitle: 'Example pie chart 2',
        innerRadius: 75,
      } as Partial<IPieChartOptions>,
    });
  });
});

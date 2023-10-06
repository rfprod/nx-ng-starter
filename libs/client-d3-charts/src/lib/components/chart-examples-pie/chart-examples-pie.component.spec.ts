import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { IPieChartOptions } from '../../interfaces/pie-chart.interface';
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
      first: <Partial<IPieChartOptions>>{
        chartTitle: 'Example pie chart 1',
      },
      second: <Partial<IPieChartOptions>>{
        chartTitle: 'Example pie chart 2',
        innerRadius: 75,
      },
    });
  });
});

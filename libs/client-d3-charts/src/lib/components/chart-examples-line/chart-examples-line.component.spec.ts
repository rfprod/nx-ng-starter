import { type ComponentFixture, TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { AppChartExamplesLineComponent } from './chart-examples-line.component';

describe('AppChartExamplesLineComponent', () => {
  const testBedConfig: TestModuleMetadata = {
    declarations: [AppChartExamplesLineComponent],
  };

  let fixture: ComponentFixture<AppChartExamplesLineComponent>;
  let component: AppChartExamplesLineComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppChartExamplesLineComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('the chart options should have expected structure', async () => {
    const config = await firstValueFrom(component.chartConfig$);
    expect(config.options).toEqual({
      chartTitle: 'Example line chart, date format default',
      dateFormat: 'default',
      xAxisTitle: 'Date range',
      yAxisTitle: 'Value range',
    });
  });
});

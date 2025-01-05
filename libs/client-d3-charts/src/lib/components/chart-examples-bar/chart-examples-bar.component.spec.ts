import { type ComponentFixture, TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { AppChartExamplesBarComponent } from './chart-examples-bar.component';

describe('AppChartExamplesBarComponent', () => {
  const testBedConfig: TestModuleMetadata = {
    declarations: [AppChartExamplesBarComponent],
  };

  let fixture: ComponentFixture<AppChartExamplesBarComponent>;
  let component: AppChartExamplesBarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppChartExamplesBarComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('the chart options should have expected structure', async () => {
    const config = await firstValueFrom(component.chartConfig$);
    expect(config.options).toEqual({
      chartTitle: 'Example bar chart',
      xAxisTitle: 'long x axis title',
      yAxisTitle: 'long y axis title',
    });
  });
});

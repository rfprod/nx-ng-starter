import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';

import { AppChartExamplesComponent } from './chart-examples.component';

describe('AppGlobalProgressBarComponent', () => {
  const testBedConfig: TestModuleMetadata = {
    declarations: [AppChartExamplesComponent],
  };

  let fixture: ComponentFixture<AppChartExamplesComponent>;
  let component: AppChartExamplesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppChartExamplesComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('barChartOptions should have expected structure', () => {
    expect(component.barChartOptions()).toEqual({
      chartTitle: 'Example bar chart',
      xAxisTitle: 'long x axis title',
      yAxisTitle: 'long y axis title',
    });
  });

  it('lineChartOptions should have expected structure', () => {
    expect(component.lineChartOptions()).toEqual({
      chartTitle: 'Example line chart, date format default',
      dateFormat: 'default',
      xAxisTitle: 'Date range',
      yAxisTitle: 'Value range',
    });
  });

  it('radarChartOptions should have expected structure', () => {
    expect(component.radarChartOptions()).toEqual({
      chartTitle: 'Example radar chart',
    });
  });

  it('pieChartOptions should have expected structure', () => {
    expect(component.pieChartOptions()).toEqual({
      chartTitle: 'Example pie chart',
    });
  });

  it('forceDirectedChartOptions should have expected structure', () => {
    expect(component.forceDirectedChartOptions()).toEqual({
      chartTitle: 'Example force directed chart',
    });
  });
});

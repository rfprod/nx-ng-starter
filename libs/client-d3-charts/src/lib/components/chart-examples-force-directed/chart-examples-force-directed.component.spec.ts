import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { AppChartExamplesForceDirectedComponent } from './chart-examples-force-directed.component';

describe('AppChartExamplesForceDirectedComponent', () => {
  const testBedConfig: TestModuleMetadata = {
    declarations: [AppChartExamplesForceDirectedComponent],
  };

  let fixture: ComponentFixture<AppChartExamplesForceDirectedComponent>;
  let component: AppChartExamplesForceDirectedComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppChartExamplesForceDirectedComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('the chart options should have expected structure', async () => {
    const config = await firstValueFrom(component.forceDirectedChartConfig$);
    expect(config.options).toEqual({
      chartTitle: 'Example force directed chart',
    });
  });
});

import { type ComponentFixture, TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { AppChartExamplesRadaraComponent } from './chart-examples-radar.component';

describe('AppChartExamplesRadaraComponent', () => {
  const testBedConfig: TestModuleMetadata = {
    declarations: [AppChartExamplesRadaraComponent],
  };

  let fixture: ComponentFixture<AppChartExamplesRadaraComponent>;
  let component: AppChartExamplesRadaraComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppChartExamplesRadaraComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('the chart options should have expected structure', async () => {
    const config = await firstValueFrom(component.chartConfig$);
    expect(config.options).toEqual({
      chartTitle: 'Example radar chart',
    });
  });
});

import { DOCUMENT } from '@angular/common';
import { type ComponentFixture, TestBed, type TestModuleMetadata } from '@angular/core/testing';

import { D3_CHART_FACTORY } from '../../providers/d3-chart-factory.provider';
import { AppPieChartComponent } from './pie-chart.component';

describe('AppPieChartComponent', () => {
  const testBedConfig: TestModuleMetadata = {
    declarations: [AppPieChartComponent],
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

  let fixture: ComponentFixture<AppPieChartComponent>;
  let component: AppPieChartComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppPieChartComponent);
    component = fixture.debugElement.componentInstance;

    // fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  test.todo('AppPieChartComponent');
});

import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { D3_CHART_FACTORY } from '../../providers/d3-chart-factory.provider';
import { AppRadarChartComponent } from './radar-chart.component';

describe('AppRadarChartComponent', () => {
  const testBedConfig: TestModuleMetadata = {
    imports: [NoopAnimationsModule, BrowserDynamicTestingModule],
    declarations: [AppRadarChartComponent],
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

  let fixture: ComponentFixture<AppRadarChartComponent>;
  let component: AppRadarChartComponent;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppRadarChartComponent);
        component = fixture.debugElement.componentInstance;

        // fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  test.todo('AppRadarChartComponent');
});

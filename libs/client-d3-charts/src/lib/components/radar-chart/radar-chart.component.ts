import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  SimpleChange,
  ViewChild,
} from '@angular/core';

import { IRadarChartDataNode, IRadarChartOptions } from '../../interfaces/radar-chart.interface';
import { D3_CHART_FACTORY, ID3ChartFactory } from '../../providers/d3-chart-factory.provider';

interface IInputChanges {
  data?: SimpleChange | null;
}

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppRadarChartComponent implements AfterViewInit, OnChanges {
  @Input() public chartId = '0';

  @Input() public data: IRadarChartDataNode[][] = [[]];

  /**
   * D3 chart view child reference.
   */
  @ViewChild('container') private readonly container?: ElementRef<HTMLDivElement>;

  constructor(@Inject(DOCUMENT) private readonly doc: Document, @Inject(D3_CHART_FACTORY) private readonly d3Factory: ID3ChartFactory) {}

  private chartOptions() {
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const minWidth = 300;
    const modifiers = {
      width: 10,
      height: 20,
    };
    const width = Math.min(minWidth, this.doc.body.clientWidth - modifiers.width) - margin.left - margin.right;
    const height = Math.min(width, this.doc.body.clientHeight - margin.top - margin.bottom - modifiers.height);
    const options: Partial<IRadarChartOptions> = {
      width,
      height,
      margin,
      maxValue: 15,
      levels: 5,
      roundStrokes: true,
    };
    return options;
  }

  private drawChart() {
    if (typeof this.container !== 'undefined') {
      const options = this.chartOptions();
      this.d3Factory.drawRadarChart(this.container, this.data, options);
    }
  }

  /**
   * Draws chart.
   */
  public ngAfterViewInit(): void {
    this.drawChart();
  }

  /**
   * Redraws chart on changes.
   */
  public ngOnChanges(changes: IInputChanges): void {
    const currentValue: IRadarChartDataNode[][] = changes.data?.currentValue;
    if (typeof currentValue !== 'undefined' && currentValue !== null) {
      this.drawChart();
    }
  }
}

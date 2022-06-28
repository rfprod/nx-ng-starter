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

import { ILineChartDataNode, ILineChartOptions, TLineChartData } from '../../interfaces/line-chart.interface';
import { D3_CHART_FACTORY, ID3ChartFactory } from '../../providers/d3-chart-factory.provider';
import { defaultLineChartConfig } from '../../util';

interface IInputChanges {
  data?: SimpleChange | null;
  options?: SimpleChange | null;
}

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLineChartComponent implements AfterViewInit, OnChanges {
  /**
   * The chart id.
   */
  @Input() public chartId = 'line-0';

  /**
   * The chart data.
   */
  @Input() public data: TLineChartData = [];

  /**
   * The chart options.
   */
  @Input() public options: Partial<ILineChartOptions> = {};

  /**
   * D3 chart view child reference.
   */
  @ViewChild('container') private readonly container?: ElementRef<HTMLDivElement>;

  constructor(@Inject(DOCUMENT) private readonly doc: Document, @Inject(D3_CHART_FACTORY) private readonly d3Factory: ID3ChartFactory) {}

  /**
   * The chart options constructor.
   * @returns chart options
   */
  private chartOptions() {
    const bodyWidthAdjustment = 10;
    const width = Math.min(
      this.options.width ?? defaultLineChartConfig.width,
      this.doc.body.clientWidth - defaultLineChartConfig.margin.left - defaultLineChartConfig.margin.right - bodyWidthAdjustment,
    );
    const xTicksScale = 50;
    const ticks: ILineChartOptions['ticks'] = {
      x: width / xTicksScale,
      y: Math.max(...this.data.map(item => item.value)),
    };
    const height = Math.min(
      this.options.height ?? width,
      this.doc.body.clientWidth - defaultLineChartConfig.margin.top - defaultLineChartConfig.margin.bottom - bodyWidthAdjustment,
    );
    const options: Partial<ILineChartOptions> = {
      width,
      height,
      ticks,
      ...this.options,
    };
    return options;
  }

  /**
   * Draws the chart.
   */
  private drawChart() {
    if (typeof this.container !== 'undefined') {
      const options = this.chartOptions();
      this.d3Factory.drawLineChart(this.container, this.data, options);
    }
  }

  /**
   * Actually draws the chart after the component view is initialized.
   */
  public ngAfterViewInit(): void {
    this.drawChart();
  }

  /**
   * Redraws the chart on changes.
   */
  public ngOnChanges(changes: IInputChanges): void {
    const data: ILineChartDataNode[][] = changes.data?.currentValue;
    const options: Partial<ILineChartOptions> = changes.options?.currentValue;
    if ((typeof data !== 'undefined' && data !== null) || (typeof options !== 'undefined' && options !== null)) {
      this.drawChart();
    }
  }
}

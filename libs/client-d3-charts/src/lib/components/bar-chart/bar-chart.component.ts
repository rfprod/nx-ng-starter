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

import { IBarChartDataNode, IBarChartOptions, TBarChartData } from '../../interfaces/bar-chart.interface';
import { D3_CHART_FACTORY, ID3ChartFactory } from '../../providers/d3-chart-factory.provider';
import { defaultBarChartConfig } from '../../util';

interface IInputChanges {
  data?: SimpleChange | null;
  options?: SimpleChange | null;
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppBarChartComponent implements AfterViewInit, OnChanges {
  /**
   * The chart id.
   */
  @Input() public chartId = 'bar-0';

  /**
   * The chart data.
   */
  @Input() public data: TBarChartData = [];

  /**
   * The chart options.
   */
  @Input() public options: Partial<IBarChartOptions> = {};

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
      this.options.width ?? defaultBarChartConfig.width,
      this.doc.body.clientWidth - defaultBarChartConfig.margin.left - defaultBarChartConfig.margin.right - bodyWidthAdjustment,
    );
    const height = Math.min(
      this.options.height ?? width,
      this.doc.body.clientWidth - defaultBarChartConfig.margin.top - defaultBarChartConfig.margin.bottom - bodyWidthAdjustment,
    );
    const yAxisTicks = Math.max(...this.data.map(item => item.value));
    const options: Partial<IBarChartOptions> = {
      width,
      height,
      yAxisTicks,
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
      this.d3Factory.drawBarChart(this.container, this.data, options);
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
    const data: IBarChartDataNode[][] = changes.data?.currentValue;
    const options: Partial<IBarChartOptions> = changes.options?.currentValue;
    if ((typeof data !== 'undefined' && data !== null) || (typeof options !== 'undefined' && options !== null)) {
      this.drawChart();
    }
  }
}

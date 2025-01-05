import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnChanges, ViewChild } from '@angular/core';

import { IBarChartOptions, TBarChartData } from '../../interfaces/bar-chart.interface';
import { IChartInputChanges } from '../../interfaces/chart-component.interface';
import { D3_CHART_FACTORY, ID3ChartFactory } from '../../providers/d3-chart-factory.provider';
import { defaultBarChartConfig } from '../../util/bar-chart.util';
import { AppD3ChartBase } from '../_base/chart.base';

type TBarData = TBarChartData;
type TBarOptions = Partial<IBarChartOptions>;

/** The bar chart component. */
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppBarChartComponent extends AppD3ChartBase<TBarData, TBarOptions> implements AfterViewInit, OnChanges {
  /** The chart id. */
  @Input() public chartId = 'bar-0';

  /** The chart data. */
  @Input() public data: TBarData = [];

  /** The chart options. */
  @Input() public options: TBarOptions = {};

  /** D3 chart view child reference. */
  @ViewChild('container') public readonly container?: ElementRef<HTMLDivElement>;

  /**
   * @param doc The web page's Document object.
   * @param d3Factory D3 chart factory.
   */
  constructor(
    @Inject(DOCUMENT) private readonly doc: Document,
    @Inject(D3_CHART_FACTORY) private readonly d3Factory: ID3ChartFactory,
  ) {
    super();
  }

  /** The chart options constructor. */
  protected chartOptions(): TBarOptions {
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
    const options: TBarOptions = {
      width,
      height,
      yAxisTicks,
      ...this.options,
    };
    return options;
  }

  /** Draws the chart. */
  protected drawChart(): void {
    if (typeof this.container !== 'undefined') {
      const options = this.chartOptions();
      this.d3Factory.drawBarChart(this.container, this.data, options);
    }
  }

  /** Actually draws the chart after the component view is initialized. */
  public ngAfterViewInit(): void {
    this.drawChart();
  }

  /** Redraws the chart on changes. */
  public ngOnChanges(changes: IChartInputChanges): void {
    const data: TBarData = changes.data?.currentValue;
    const options: TBarOptions = changes.options?.currentValue;
    if ((typeof data !== 'undefined' && data !== null) || (typeof options !== 'undefined' && options !== null)) {
      this.drawChart();
    }
  }
}

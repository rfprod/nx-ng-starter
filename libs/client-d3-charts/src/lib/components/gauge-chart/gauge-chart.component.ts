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

import { IGaugeChartDataNode, IGaugeChartOptions } from '../../interfaces/gauge-chart.interface';
import { D3_CHART_FACTORY, ID3ChartFactory } from '../../providers/d3-chart-factory.provider';

interface IInputChanges {
  data?: SimpleChange | null;
  options?: SimpleChange | null;
}

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppGaugeChartComponent implements AfterViewInit, OnChanges {
  /**
   * The chart id.
   */
  @Input() public chartId = 'gauge-0';

  /**
   * The value of the gauge chart.
   */
  @Input() public value = 0;

  /**
   * The chart data.
   */
  @Input() public data: IGaugeChartDataNode[] = [];

  /**
   * The chart options.
   */
  @Input() public options: Partial<IGaugeChartOptions> = {};

  /**
   * D3 chart view child reference.
   */
  @ViewChild('container') private readonly container?: ElementRef<HTMLDivElement>;

  constructor(
    @Inject(DOCUMENT) private readonly doc: Document,
    @Inject(D3_CHART_FACTORY) private readonly d3Factory: ID3ChartFactory,
  ) {}

  /**
   * The chart options constructor.
   * @returns chart options
   */
  private chartOptions() {
    const margin: IGaugeChartOptions['margin'] = { top: 50, right: 50, bottom: 50, left: 50 };
    const minWidth = 350;
    const modifiers = {
      width: 10,
      height: 20,
    };
    const width = Math.min(minWidth, this.doc.body.clientWidth - modifiers.width) - margin.left - margin.right;
    const height = Math.min(width, this.doc.body.clientHeight - margin.top - margin.bottom - modifiers.height);
    const options: Partial<IGaugeChartOptions> = {
      width,
      height,
      margin,
      ...this.options,
      value: this.value,
    };
    return options;
  }

  /**
   * Draws the chart.
   */
  private drawChart() {
    if (typeof this.container !== 'undefined') {
      const options = this.chartOptions();
      this.d3Factory.drawGaugeChart(this.container, this.data, options);
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
    const data: IGaugeChartDataNode[] | undefined = changes.data?.currentValue;
    const options: Partial<IGaugeChartOptions> = changes.options?.currentValue;
    if ((typeof data !== 'undefined' && data !== null) || (typeof options !== 'undefined' && options !== null)) {
      this.drawChart();
    }
  }
}

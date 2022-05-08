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

import { IForceDirectedChartData, IForceDirectedChartOptions } from '../../interfaces/force-directed-chart.interface';
import { D3_CHART_FACTORY, ID3ChartFactory } from '../../providers/d3-chart-factory.provider';

interface IInputChanges {
  data?: SimpleChange | null;
  options?: SimpleChange | null;
}

@Component({
  selector: 'app-force-directed-chart',
  templateUrl: './force-directed-chart.component.html',
  styleUrls: ['./force-directed-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppForceDirectedChartComponent implements AfterViewInit, OnChanges {
  /**
   * The chart identifier.
   */
  @Input() public chartId = 'force-0';

  /**
   * The chart data.
   */
  @Input() public data: IForceDirectedChartData = {
    domains: [],
    entities: [],
    links: [],
    nodes: [],
  };

  /**
   * The chart options.
   */
  @Input() public options: Partial<IForceDirectedChartOptions> = {};

  /**
   * The chart container view child reference.
   */
  @ViewChild('container') private readonly container?: ElementRef<HTMLDivElement>;

  constructor(@Inject(DOCUMENT) private readonly doc: Document, @Inject(D3_CHART_FACTORY) private readonly d3Factory: ID3ChartFactory) {}

  /**
   * The chart options constructor.
   * @returns chart options
   */
  private chartOptions() {
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const minWidth = 350;
    const modifiers = {
      width: 10,
      height: 20,
    };
    const width = Math.min(minWidth, this.doc.body.clientWidth - modifiers.width) - margin.left - margin.right;
    const height = Math.min(width, this.doc.body.clientHeight - margin.top - margin.bottom - modifiers.height);
    const options: Partial<IForceDirectedChartOptions> = { width, height, margin, ...this.options };
    return options;
  }

  /**
   * Draws the chart.
   */
  private drawChart() {
    if (typeof this.container !== 'undefined') {
      const options = this.chartOptions();
      this.d3Factory.drawForceDirectedChart(this.container, this.data, options);
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
    const prevData: IForceDirectedChartData | undefined = changes.data?.previousValue;
    const nextData: IForceDirectedChartData | undefined = changes.data?.currentValue;
    const options: Partial<IForceDirectedChartOptions> = changes.options?.currentValue;
    if (
      (Boolean(changes.data?.currentValue) && (prevData?.nodes ?? []).length !== (nextData?.nodes ?? []).length) ||
      (typeof options !== 'undefined' && options !== null)
    ) {
      this.drawChart();
    }
  }
}

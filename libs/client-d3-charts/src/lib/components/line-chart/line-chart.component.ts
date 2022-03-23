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
import { defaultLineChartConfig } from '../../util/line-chart.util';

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
  @Input() public chartId = 'bar-0';

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
    const margin = { top: 70, right: 50, bottom: 50, left: 60 };
    const minWidth = 350;
    const modifiers = {
      width: 10,
      height: 20,
    };
    const width = Math.min(minWidth, this.doc.body.clientWidth - modifiers.width) - margin.left - margin.right;
    const height = Math.min(width, this.doc.body.clientHeight - margin.top - margin.bottom - modifiers.height);
    const pixelsPerCharacter = 4;
    const options: Partial<ILineChartOptions> = {
      width,
      height,
      margin,
      ticks: {
        x: 5,
        y: Math.max(...this.data.map(item => item.value)),
      },
      shift: {
        xAxisLabelX:
          defaultLineChartConfig.shift.xAxisLabelX +
          ((this.options.xAxisTitle ?? defaultLineChartConfig.xAxisTitle).length - 1) * pixelsPerCharacter,
        xAxisLabelY: 228,
        yAxisLabelX: -10,
        yAxisLabelY: -10,
      },
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

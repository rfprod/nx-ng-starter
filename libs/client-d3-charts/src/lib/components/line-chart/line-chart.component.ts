import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  inject,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';

import { IChartInputChanges } from '../../interfaces/chart-component.interface';
import { ILineChartOptions, TLineChartData } from '../../interfaces/line-chart.interface';
import { D3_CHART_FACTORY } from '../../providers/d3-chart-factory.provider';
import { defaultLineChartConfig } from '../../util/line-chart.util';
import { AppD3ChartBase } from '../_base/chart.base';

type TLineData = TLineChartData[];
type TLineOptions = Partial<ILineChartOptions>;

/** The line chart component. */
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppLineChartComponent extends AppD3ChartBase<TLineData, TLineOptions> implements AfterViewInit, OnChanges {
  private readonly doc = inject(DOCUMENT);

  private readonly factory = inject(D3_CHART_FACTORY);

  /** The chart id. */
  @Input() public chartId = 'line-0';

  /** The chart data. */
  @Input() public data: TLineData = [];

  /** Labels for the chart datasets. */
  @Input() public datasetLabels: string[] = [];

  /** The chart options. */
  @Input() public options: TLineOptions = {};

  /** D3 chart view child reference. */
  @ViewChild('container') public readonly container?: ElementRef<HTMLDivElement>;

  constructor() {
    super();
  }

  /** The chart options constructor. */
  protected chartOptions(): TLineOptions {
    const bodyWidthAdjustment = 10;
    const width = Math.min(
      this.options.width ?? defaultLineChartConfig.width,
      this.doc.body.clientWidth - defaultLineChartConfig.margin.left - defaultLineChartConfig.margin.right - bodyWidthAdjustment,
    );
    const height = Math.min(
      this.options.height ?? width,
      this.doc.body.clientWidth - defaultLineChartConfig.margin.top - defaultLineChartConfig.margin.bottom - bodyWidthAdjustment,
    );
    const xTicksScale = 75;
    const yTicksScale = 25;
    const ticks: TLineOptions['ticks'] = {
      x: this.options.ticks?.x ?? width / xTicksScale,
      y: this.options.ticks?.y ?? height / yTicksScale,
    };
    const options: TLineOptions = {
      ...this.options,
      width,
      height,
      ticks,
    };
    return options;
  }

  /** Draws the chart. */
  protected drawChart(): void {
    if (typeof this.container !== 'undefined') {
      const options = this.chartOptions();
      this.factory.drawLineChart(this.container, [...this.data], [...this.datasetLabels], options);
    }
  }

  /** Actually draws the chart after the component view is initialized. */
  public ngAfterViewInit(): void {
    this.drawChart();
  }

  /** Redraws the chart on changes. */
  public ngOnChanges(changes: IChartInputChanges): void {
    const data: TLineData = changes.data?.currentValue;
    const options: TLineOptions = changes.options?.currentValue;
    if ((typeof data !== 'undefined' && data !== null) || (typeof options !== 'undefined' && options !== null)) {
      this.drawChart();
    }
  }
}

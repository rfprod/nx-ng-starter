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
import { IGaugeChartDataNode, IGaugeChartOptions } from '../../interfaces/gauge-chart.interface';
import { D3_CHART_FACTORY } from '../../providers/d3-chart-factory.provider';
import { AppD3ChartBase } from '../_base/chart.base';

type TGaugeData = IGaugeChartDataNode[];
type TGaugeOptions = Partial<IGaugeChartOptions>;

/** The gauge chart component. */
@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppGaugeChartComponent extends AppD3ChartBase<TGaugeData, TGaugeOptions> implements AfterViewInit, OnChanges {
  private readonly doc = inject(DOCUMENT);

  private readonly factory = inject(D3_CHART_FACTORY);

  /** The chart id. */
  @Input() public chartId = 'gauge-0';

  /** The value of the gauge chart. */
  @Input() public value = 0;

  /** The chart data. */
  @Input() public data: TGaugeData = [];

  /** The chart options. */
  @Input() public options: TGaugeOptions = {};

  /** D3 chart view child reference. */
  @ViewChild('container') public readonly container?: ElementRef<HTMLDivElement>;

  constructor() {
    super();
  }

  /** The chart options constructor. */
  protected chartOptions(): TGaugeOptions {
    const margin: TGaugeOptions['margin'] = { top: 50, right: 50, bottom: 50, left: 50 };
    const minWidth = 350;
    const modifiers = {
      width: 10,
      height: 20,
    };
    const width = Math.min(minWidth, this.doc.body.clientWidth - modifiers.width) - margin.left - margin.right;
    const height = Math.min(width, this.doc.body.clientHeight - margin.top - margin.bottom - modifiers.height);
    const options: TGaugeOptions = {
      width,
      height,
      margin,
      ...this.options,
      value: this.value,
    };
    return options;
  }

  /** Draws the chart. */
  protected drawChart(): void {
    if (typeof this.container !== 'undefined') {
      const options = this.chartOptions();
      this.factory.drawGaugeChart(this.container, this.data, options);
    }
  }

  /** Actually draws the chart after the component view is initialized. */
  public ngAfterViewInit(): void {
    this.drawChart();
  }

  /** Redraws the chart on changes. */
  public ngOnChanges(changes: IChartInputChanges): void {
    const data: TGaugeData | undefined = changes.data?.currentValue;
    const options: TGaugeOptions = changes.options?.currentValue;
    if ((typeof data !== 'undefined' && data !== null) || (typeof options !== 'undefined' && options !== null)) {
      this.drawChart();
    }
  }
}

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
import { IForceDirectedChartData, IForceDirectedChartOptions } from '../../interfaces/force-directed-chart.interface';
import { D3_CHART_FACTORY } from '../../providers/d3-chart-factory.provider';
import { AppD3ChartBase } from '../_base/chart.base';

type TForceData = IForceDirectedChartData;
type TForceOptions = Partial<IForceDirectedChartOptions>;

/** The force directed chart component. */
@Component({
  selector: 'app-force-directed-chart',
  templateUrl: './force-directed-chart.component.html',
  styleUrls: ['./force-directed-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppForceDirectedChartComponent extends AppD3ChartBase<TForceData, TForceOptions> implements AfterViewInit, OnChanges {
  private readonly doc = inject(DOCUMENT);

  private readonly factory = inject(D3_CHART_FACTORY);

  /** The chart identifier. */
  @Input() public chartId = 'force-0';

  /** The chart data. */
  @Input() public data: TForceData = {
    domains: [],
    entities: [],
    links: [],
    nodes: [],
  };

  /** The chart options. */
  @Input() public options: TForceOptions = {};

  /** The chart container view child reference. */
  @ViewChild('container') public readonly container?: ElementRef<HTMLDivElement>;

  constructor() {
    super();
  }

  /** The chart options constructor. */
  protected chartOptions(): TForceOptions {
    const margin: TForceOptions['margin'] = { top: 50, right: 50, bottom: 50, left: 50 };
    const minWidth = 350;
    const modifiers = {
      width: 10,
      height: 20,
    };
    const width = Math.min(minWidth, this.doc.body.clientWidth - modifiers.width) - margin.left - margin.right;
    const height = Math.min(width, this.doc.body.clientHeight - margin.top - margin.bottom - modifiers.height);
    const options: TForceOptions = { width, height, margin, ...this.options };
    return options;
  }

  /** Draws the chart. */
  protected drawChart(): void {
    if (typeof this.container !== 'undefined') {
      const options = this.chartOptions();
      this.factory.drawForceDirectedChart(this.container, this.data, options);
    }
  }

  /** Actually draws the chart after the component view is initialized. */
  public ngAfterViewInit(): void {
    this.drawChart();
  }

  /** Redraws the chart on changes. */
  public ngOnChanges(changes: IChartInputChanges): void {
    const prevData: TForceData | undefined = changes.data?.previousValue;
    const nextData: TForceData | undefined = changes.data?.currentValue;
    const options: TForceOptions = changes.options?.currentValue;
    if (
      (Boolean(changes.data?.currentValue) && (prevData?.nodes ?? []).length !== (nextData?.nodes ?? []).length) ||
      (typeof options !== 'undefined' && options !== null)
    ) {
      this.drawChart();
    }
  }
}

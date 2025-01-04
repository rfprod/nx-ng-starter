import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnChanges, ViewChild } from '@angular/core';

import { IChartInputChanges } from '../../interfaces/chart-component.interface';
import { IRadarChartDataNode, IRadarChartOptions } from '../../interfaces/radar-chart.interface';
import { D3_CHART_FACTORY, ID3ChartFactory } from '../../providers/d3-chart-factory.provider';
import { defaultRadarChartConfig } from '../../util/radar-chart.util';
import { AppD3ChartBase } from '../_base/chart.base';

type TRadarData = IRadarChartDataNode[][];
type TRadarOptions = Partial<IRadarChartOptions>;

/** The radar chart component. */
@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppRadarChartComponent extends AppD3ChartBase<TRadarData, TRadarOptions> implements AfterViewInit, OnChanges {
  /** The chart id. */
  @Input() public chartId = 'radar-0';

  /** The chart data. */
  @Input() public data: TRadarData = [[]];

  /** The chart options. */
  @Input() public options: TRadarOptions = {};

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
  protected chartOptions(): TRadarOptions {
    const xsOffset = 500;
    const smOffset = 800;
    const mdOffset = 1024;
    const labelFactorDefault = 1.15;
    const labelFactorMd = 1.15;
    const labelFactorSm = 1.15;
    const labelFactorXs = 1.4;
    const wrapWidthDefault = 85;
    const wrapWidthMd = 80;
    const wrapWidthXs = 70;
    const bodyWidthAdjustment = 10;
    const width = Math.min(
      this.options.width ?? defaultRadarChartConfig.width,
      this.doc.body.clientWidth - defaultRadarChartConfig.margin.left - defaultRadarChartConfig.margin.right - bodyWidthAdjustment,
    );
    const height = Math.min(
      width,
      this.doc.body.clientHeight - defaultRadarChartConfig.margin.top - defaultRadarChartConfig.margin.bottom - bodyWidthAdjustment,
    );
    const labelFactor =
      width <= xsOffset ? labelFactorXs : width <= smOffset ? labelFactorSm : width <= mdOffset ? labelFactorMd : labelFactorDefault;
    const labelTextWrapWidth = width <= xsOffset ? wrapWidthXs : width <= mdOffset ? wrapWidthMd : wrapWidthDefault;
    const options: TRadarOptions = {
      width,
      height,
      maxValue: this.data[0].reduce((accumulator, item) => (item.value > accumulator ? item.value : accumulator), 0) + 1,
      levels: 5,
      roundStrokes: true,
      labelFactor,
      labelTextWrapWidth,
      ...this.options,
    };
    return options;
  }

  /** Draws the chart. */
  protected drawChart(): void {
    if (typeof this.container !== 'undefined') {
      const options = this.chartOptions();
      this.d3Factory.drawRadarChart(this.container, this.data, options);
    }
  }

  /** Actually draws the chart after the component view is initialized. */
  public ngAfterViewInit(): void {
    this.drawChart();
  }

  /** Redraws the chart on changes. */
  public ngOnChanges(changes: IChartInputChanges): void {
    const currentValue: TRadarData = changes.data?.currentValue;
    const options: TRadarOptions = changes.options?.currentValue;
    if ((typeof currentValue !== 'undefined' && currentValue !== null) || (typeof options !== 'undefined' && options !== null)) {
      this.drawChart();
    }
  }
}

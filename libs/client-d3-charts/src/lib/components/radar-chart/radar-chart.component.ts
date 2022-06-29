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

import { IRadarChartDataNode, IRadarChartOptions } from '../../interfaces/radar-chart.interface';
import { D3_CHART_FACTORY, ID3ChartFactory } from '../../providers/d3-chart-factory.provider';
import { defaultRadarChartConfig } from '../../util';

interface IInputChanges {
  data?: SimpleChange | null;
  options?: SimpleChange | null;
}

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppRadarChartComponent implements AfterViewInit, OnChanges {
  /**
   * The chart id.
   */
  @Input() public chartId = 'radar-0';

  /**
   * The chart data.
   */
  @Input() public data: IRadarChartDataNode[][] = [[]];

  /**
   * The chart options.
   */
  @Input() public options: Partial<IRadarChartOptions> = {};

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
    const options: Partial<IRadarChartOptions> = {
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

  /**
   * Draws the chart.
   */
  private drawChart() {
    if (typeof this.container !== 'undefined') {
      const options = this.chartOptions();
      this.d3Factory.drawRadarChart(this.container, this.data, options);
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
    const currentValue: IRadarChartDataNode[][] = changes.data?.currentValue;
    const options: Partial<IRadarChartOptions> = changes.options?.currentValue;
    if ((typeof currentValue !== 'undefined' && currentValue !== null) || (typeof options !== 'undefined' && options !== null)) {
      this.drawChart();
    }
  }
}

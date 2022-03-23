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
  @Input() public chartId = '0';

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
    const margin = { top: 90, right: 100, bottom: 90, left: 100 };
    const widthOffset = { min: 500, max: 700 };
    const halfWidth = this.doc.body.clientWidth;
    const xsOffset = 500;
    const smOffset = 800;
    const mdOffset = 1024;
    const labelFactorDefault = 1.25;
    const labelFactorMd = 1.35;
    const labelFactorSm = 1.45;
    const labelFactorXs = 1.55;
    const labelFactor =
      this.doc.body.clientWidth <= xsOffset
        ? labelFactorXs
        : this.doc.body.clientWidth <= smOffset
        ? labelFactorSm
        : this.doc.body.clientWidth <= mdOffset
        ? labelFactorMd
        : labelFactorDefault;
    const wrapWidthDefault = 85;
    const wrapWidthMd = 80;
    const wrapWidthXs = 70;
    const labelTextWrapWidth =
      this.doc.body.clientWidth <= xsOffset ? wrapWidthXs : this.doc.body.clientWidth <= mdOffset ? wrapWidthMd : wrapWidthDefault;
    const minWidth = halfWidth < widthOffset.min ? widthOffset.min : halfWidth > widthOffset.max ? widthOffset.max : halfWidth;
    const modifiers = {
      width: 10,
      height: 20,
    };
    const width = Math.min(minWidth, this.doc.body.clientWidth - modifiers.width) - margin.left - margin.right;
    const height = Math.min(width, this.doc.body.clientHeight - margin.top - margin.bottom - modifiers.height);
    const options: Partial<IRadarChartOptions> = {
      width,
      height,
      margin,
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

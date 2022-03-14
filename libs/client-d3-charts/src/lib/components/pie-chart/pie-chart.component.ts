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

import { IPieChartDataNode, IPieChartOptions } from '../../interfaces/pie-chart.interface';
import { D3_CHART_FACTORY, ID3ChartFactory } from '../../providers/d3-chart-factory.provider';

interface IInputChanges {
  data?: SimpleChange | null;
  options?: SimpleChange | null;
}

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPieChartComponent implements AfterViewInit, OnChanges {
  @Input() public chartId = 'pie-0';

  @Input() public data: IPieChartDataNode[] = [];

  @Input() public options: Partial<IPieChartOptions> = {};

  /**
   * D3 chart view child reference.
   */
  @ViewChild('container') private readonly container?: ElementRef<HTMLCanvasElement>;

  constructor(@Inject(DOCUMENT) private readonly doc: Document, @Inject(D3_CHART_FACTORY) private readonly d3Factory: ID3ChartFactory) {}

  private chartOptions() {
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const minWidth = 350;
    const modifiers = {
      width: 10,
      height: 20,
    };
    const width = Math.min(minWidth, this.doc.body.clientWidth - modifiers.width) - margin.left - margin.right;
    const height = Math.min(width, this.doc.body.clientHeight - margin.top - margin.bottom - modifiers.height);
    const options: Partial<IPieChartOptions> = {
      width,
      height,
      margin,
      ...this.options,
    };
    return options;
  }

  private drawChart() {
    if (typeof this.container !== 'undefined') {
      const options = this.chartOptions();
      this.d3Factory.drawPieChart(this.container, this.data, options);
    }
  }

  /**
   * Draws chart.
   */
  public ngAfterViewInit(): void {
    this.drawChart();
  }

  /**
   * Redraws chart on changes.
   */
  public ngOnChanges(changes: IInputChanges): void {
    const data: IPieChartDataNode[] | undefined = changes.data?.currentValue;
    const options: Partial<IPieChartOptions> = changes.options?.currentValue;
    if ((typeof data !== 'undefined' && data !== null) || (typeof options !== 'undefined' && options !== null)) {
      this.drawChart();
    }
  }
}

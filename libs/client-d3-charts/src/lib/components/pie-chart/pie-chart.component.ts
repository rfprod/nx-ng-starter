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
}

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPieChartComponent implements AfterViewInit, OnChanges {
  @Input() public data: IPieChartDataNode[] = [];

  /**
   * D3 chart view child reference.
   */
  @ViewChild('canvas') private readonly canvas?: ElementRef<HTMLCanvasElement>;

  constructor(@Inject(DOCUMENT) private readonly doc: Document, @Inject(D3_CHART_FACTORY) private readonly d3Factory: ID3ChartFactory) {}

  private chartOptions() {
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const minWidth = 300;
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
    };
    return options;
  }

  private drawChart() {
    if (typeof this.canvas !== 'undefined') {
      const options = this.chartOptions();
      this.d3Factory.drawPieChart(this.canvas, this.data, options);
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
    const currentValue: IPieChartDataNode[] | undefined = changes.data?.currentValue;
    if (typeof currentValue !== 'undefined' && currentValue !== null) {
      this.drawChart();
    }
  }
}

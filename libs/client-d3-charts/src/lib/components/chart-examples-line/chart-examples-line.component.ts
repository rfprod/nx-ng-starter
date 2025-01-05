import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { first, map, switchMap, timer } from 'rxjs';

import { ILineChartOptions, TDateFormat, TLineChartData } from '../../interfaces/line-chart.interface';

/** Line chart example. */
@Component({
  selector: 'app-chart-examples-line',
  templateUrl: './chart-examples-line.component.html',
  styleUrls: ['./chart-examples-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppChartExamplesLineComponent {
  /** The chart data. */
  private get chartData() {
    return [
      [
        { timestamp: this.randomTimestamp(), value: this.randomValue() },
        { timestamp: this.randomTimestamp(), value: this.randomValue() },
        { timestamp: this.randomTimestamp(), value: this.randomValue() },
        { timestamp: this.randomTimestamp(), value: this.randomValue() },
        { timestamp: this.randomTimestamp(), value: this.randomValue() },
        { timestamp: this.randomTimestamp(), value: this.randomValue() },
        { timestamp: this.randomTimestamp(), value: this.randomValue() },
      ].sort((a, b) => a.timestamp - b.timestamp),
      [
        { timestamp: this.randomTimestamp(), value: this.randomValue() },
        { timestamp: this.randomTimestamp(), value: this.randomValue() },
        { timestamp: this.randomTimestamp(), value: this.randomValue() },
        { timestamp: this.randomTimestamp(), value: this.randomValue() },
        { timestamp: this.randomTimestamp(), value: this.randomValue() },
        { timestamp: this.randomTimestamp(), value: this.randomValue() },
        { timestamp: this.randomTimestamp(), value: this.randomValue() },
      ].sort((a, b) => a.timestamp - b.timestamp),
      [
        { timestamp: this.randomTimestamp(), value: this.randomValue() },
        { timestamp: this.randomTimestamp(), value: this.randomValue() },
        { timestamp: this.randomTimestamp(), value: this.randomValue() },
        { timestamp: this.randomTimestamp(), value: this.randomValue() },
        { timestamp: this.randomTimestamp(), value: this.randomValue() },
        { timestamp: this.randomTimestamp(), value: this.randomValue() },
        { timestamp: this.randomTimestamp(), value: this.randomValue() },
      ].sort((a, b) => a.timestamp - b.timestamp),
    ] as TLineChartData[];
  }

  /** The breakpoint observer stream. */
  private readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .pipe(map(result => Object.keys(result.breakpoints).find(item => result.breakpoints[item]) ?? 'unknown'));

  /** The chart configuration stream. */
  public readonly chartConfig$ = this.breakpoint$.pipe(
    switchMap(() => {
      const timeout = 100;
      return timer(timeout).pipe(
        first(),
        map(() => ({
          data: this.chartData,
          datasetLabels: Array.from(new Array(this.chartData.length)).map((item, index) => `Dataset ${index}`),
          options: this.lineChartOptions(),
          optionsDateDdMmYy: this.lineChartOptions('dd/mm/yy'),
          optionsDateDdMmYyyy: this.lineChartOptions('dd/mm/yyyy'),
          optionsDateMmYyyy: this.lineChartOptions('mm/yyyy'),
        })),
      );
    }),
  );

  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  /**
   * Random value generator.
   * @param range value range
   */
  private randomValue(range?: number) {
    const defaultRange = 100;
    return Math.floor(Math.random() * (range ?? defaultRange) + 1);
  }

  /**
   * Random timestamp generator.
   * @param range value range
   */
  private randomTimestamp(range?: number) {
    const defaultRange = 100000000;
    return Math.floor(Math.random() * (range ?? defaultRange) + new Date().getTime());
  }

  /**
   * Example line chart options.
   * @param dateFormat date format
   */
  private lineChartOptions(dateFormat: TDateFormat = 'default') {
    return {
      chartTitle: `Example line chart, date format ${dateFormat}`,
      xAxisTitle: 'Date range',
      yAxisTitle: 'Value range',
      dateFormat,
    } as Partial<ILineChartOptions>;
  }
}

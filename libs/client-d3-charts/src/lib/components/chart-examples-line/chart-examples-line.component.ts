import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { first, map, switchMap, timer } from 'rxjs';

import { ILineChartOptions, TDateFormat, TLineChartData } from '../../interfaces/line-chart.interface';

/**
 * Line chart examples.
 */
@Component({
  selector: 'app-chart-examples-line',
  templateUrl: './chart-examples-line.component.html',
  styleUrls: ['./chart-examples-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppChartExamplesLineComponent {
  /**
   * Sample line chart data.
   */
  private get lineChartData() {
    return <TLineChartData[]>[
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
    ];
  }

  private readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .pipe(map(result => Object.keys(result.breakpoints).find(item => result.breakpoints[item]) ?? 'unknown'));

  public readonly lineChartConfig$ = this.breakpoint$.pipe(
    switchMap(() => {
      const timeout = 100;
      return timer(timeout).pipe(
        first(),
        map(() => ({
          data: this.lineChartData,
          options: this.lineChartOptions(),
          optionsDateDdMmYy: this.lineChartOptions('dd/mm/yy'),
          optionsDateDdMmYyyy: this.lineChartOptions('dd/mm/yyyy'),
          optionsDateMmYyyy: this.lineChartOptions('mm/yyyy'),
        })),
      );
    }),
  );

  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  private randomValue(range?: number) {
    const defaultRange = 100;
    return Math.floor(Math.random() * (range ?? defaultRange) + 1);
  }

  private randomTimestamp(range?: number) {
    const defaultRange = 100000000;
    return Math.floor(Math.random() * (range ?? defaultRange) + new Date().getTime());
  }

  /**
   * Example line chart options.
   * @param dateFormat date format
   */
  private lineChartOptions(dateFormat: TDateFormat = 'default') {
    return <Partial<ILineChartOptions>>{
      chartTitle: `Example line chart, date format ${dateFormat}`,
      xAxisTitle: 'Date range',
      yAxisTitle: 'Value range',
      dateFormat,
    };
  }
}

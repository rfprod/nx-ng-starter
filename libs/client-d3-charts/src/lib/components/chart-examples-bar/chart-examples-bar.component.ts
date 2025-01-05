import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { first, map, switchMap, timer } from 'rxjs';

import { IBarChartOptions, TBarChartData } from '../../interfaces/bar-chart.interface';

/** Bar chart example. */
@Component({
  selector: 'app-chart-examples-bar',
  templateUrl: './chart-examples-bar.component.html',
  styleUrls: ['./chart-examples-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppChartExamplesBarComponent {
  /** The chart data. */
  private get chartData() {
    return [
      { title: 'one', value: 1 },
      { title: 'two', value: 2 },
      { title: 'three', value: 3 },
      { title: 'four', value: 4 },
      { title: 'five', value: 5 },
    ] as TBarChartData;
  }

  /** The chart options. */
  private get chartOptions() {
    return {
      chartTitle: 'Example bar chart',
      xAxisTitle: 'long x axis title',
      yAxisTitle: 'long y axis title',
    } as Partial<IBarChartOptions>;
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
        map(() => ({ data: this.chartData, options: this.chartOptions })),
      );
    }),
  );

  constructor(private readonly breakpointObserver: BreakpointObserver) {}
}

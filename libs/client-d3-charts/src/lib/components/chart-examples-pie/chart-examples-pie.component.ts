import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { first, map, switchMap, timer } from 'rxjs';

import { IPieChartDataNode, IPieChartOptions } from '../../interfaces/pie-chart.interface';

/** Pie chart example. */
@Component({
  selector: 'app-chart-examples-pie',
  templateUrl: './chart-examples-pie.component.html',
  styleUrls: ['./chart-examples-pie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppChartExamplesPieComponent {
  /** The chart data. */
  private get chartData() {
    return [
      { key: 'one', y: 1 },
      { key: 'two', y: 2 },
      { key: 'three', y: 3 },
      { key: 'four', y: 4 },
      { key: 'five', y: 5 },
      { key: 'six', y: 6 },
    ] as IPieChartDataNode[];
  }

  /** The chart options. */
  private get chartOptions() {
    const options: {
      first: Partial<IPieChartOptions>;
      second: Partial<IPieChartOptions>;
    } = {
      first: {
        chartTitle: 'Example pie chart 1',
      } as Partial<IPieChartOptions>,
      second: {
        chartTitle: 'Example pie chart 2',
        innerRadius: 75,
      } as Partial<IPieChartOptions>,
    };
    return options;
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

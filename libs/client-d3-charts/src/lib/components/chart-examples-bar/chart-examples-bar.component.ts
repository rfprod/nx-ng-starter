import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { first, map, switchMap, timer } from 'rxjs';

import { IBarChartOptions, TBarChartData } from '../../interfaces/bar-chart.interface';

/**
 * BAr chart examples.
 */
@Component({
  selector: 'app-chart-examples-bar',
  templateUrl: './chart-examples-bar.component.html',
  styleUrls: ['./chart-examples-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppChartExamplesBarComponent {
  /**
   * Sample bar chart data.
   */
  private get barChartData() {
    return <TBarChartData>[
      { title: 'one', value: 1 },
      { title: 'two', value: 2 },
      { title: 'three', value: 3 },
      { title: 'four', value: 4 },
      { title: 'five', value: 5 },
    ];
  }

  private readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .pipe(map(result => Object.keys(result.breakpoints).find(item => result.breakpoints[item]) ?? 'unknown'));

  public readonly barChartConfig$ = this.breakpoint$.pipe(
    switchMap(() => {
      const timeout = 100;
      return timer(timeout).pipe(
        first(),
        map(() => ({ data: this.barChartData, options: this.barChartOptions() })),
      );
    }),
  );

  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  /**
   * Example bar chart options.
   */
  private barChartOptions() {
    return <Partial<IBarChartOptions>>{
      chartTitle: 'Example bar chart',
      xAxisTitle: 'long x axis title',
      yAxisTitle: 'long y axis title',
    };
  }
}

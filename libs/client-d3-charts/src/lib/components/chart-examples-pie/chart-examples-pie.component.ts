import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { first, map, switchMap, timer } from 'rxjs';

import { IPieChartDataNode, IPieChartOptions } from '../../interfaces/pie-chart.interface';

/**
 * Pie chart examples.
 */
@Component({
  selector: 'app-chart-examples-pie',
  templateUrl: './chart-examples-pie.component.html',
  styleUrls: ['./chart-examples-pie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppChartExamplesPieComponent {
  /**
   * Sample pie chart data.
   */
  private get pieChartData() {
    return <IPieChartDataNode[]>[
      { key: 'one', y: 1 },
      { key: 'two', y: 2 },
      { key: 'three', y: 3 },
      { key: 'four', y: 4 },
      { key: 'five', y: 5 },
      { key: 'six', y: 6 },
    ];
  }

  private readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .pipe(map(result => Object.keys(result.breakpoints).find(item => result.breakpoints[item]) ?? 'unknown'));

  public readonly pieChartConfig$ = this.breakpoint$.pipe(
    switchMap(() => {
      const timeout = 100;
      return timer(timeout).pipe(
        first(),
        map(() => ({ data: this.pieChartData, options: this.pieChartOptions() })),
      );
    }),
  );

  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  /**
   * Example pie chart options.
   */
  private pieChartOptions() {
    return <Partial<IPieChartOptions>>{
      chartTitle: 'Example pie chart',
    };
  }
}

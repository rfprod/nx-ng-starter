import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { first, map, switchMap, timer } from 'rxjs';

import { IRadarChartDataNode, IRadarChartOptions } from '../../interfaces/radar-chart.interface';

/**
 * Radar chart examples.
 */
@Component({
  selector: 'app-chart-examples-radar',
  templateUrl: './chart-examples-radar.component.html',
  styleUrls: ['./chart-examples-radar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppChartExamplesRadaraComponent {
  /**
   * Sample radar chart data.
   */
  private get radarChartData() {
    return <IRadarChartDataNode[][]>[
      [
        { axis: 'one', value: 1, unit: 'x' },
        { axis: 'two', value: 2, unit: 'x' },
        { axis: 'three', value: 3, unit: 'x' },
        { axis: 'four', value: 4, unit: 'x' },
        { axis: 'five', value: 5, unit: 'x' },
        { axis: 'six', value: 6, unit: 'x' },
        { axis: 'seven', value: 7, unit: 'x' },
        { axis: 'eight', value: 8, unit: 'x' },
        { axis: 'nine (long labels are wrapped)', value: 9, unit: 'x' },
      ],
      [
        { axis: 'one', value: 9, unit: 'y' },
        { axis: 'two', value: 8, unit: 'y' },
        { axis: 'three', value: 7, unit: 'y' },
        { axis: 'four', value: 6, unit: 'y' },
        { axis: 'five', value: 5, unit: 'y' },
        { axis: 'six', value: 4, unit: 'y' },
        { axis: 'seven', value: 3, unit: 'y' },
        { axis: 'eight', value: 2, unit: 'y' },
        { axis: 'nine (long labels are wrapped)', value: 1, unit: 'y' },
      ],
    ];
  }

  private readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .pipe(map(result => Object.keys(result.breakpoints).find(item => result.breakpoints[item]) ?? 'unknown'));

  public readonly radarChartConfig$ = this.breakpoint$.pipe(
    switchMap(() => {
      const timeout = 100;
      return timer(timeout).pipe(
        first(),
        map(() => ({ data: this.radarChartData, options: this.radarChartOptions() })),
      );
    }),
  );

  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  /**
   * Example radar chart options.
   */
  private radarChartOptions() {
    return <Partial<IRadarChartOptions>>{
      chartTitle: 'Example radar chart',
    };
  }
}

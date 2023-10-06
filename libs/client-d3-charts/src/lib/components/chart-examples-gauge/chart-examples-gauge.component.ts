import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { first, map, switchMap, timer } from 'rxjs';

import { IGaugeChartDataNode, IGaugeChartOptions } from '../../interfaces/gauge-chart.interface';

/** Gauge chart example. */
@Component({
  selector: 'app-chart-examples-gauge',
  templateUrl: './chart-examples-gauge.component.html',
  styleUrls: ['./chart-examples-gauge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppChartExamplesGaugeComponent {
  /** The chat values. */
  public value = {
    first: 80,
    second: 75,
    third: 65,
  };

  /** The chart data. */
  private get chartData() {
    const chunks = {
      first: 10,
      second: 100,
    };
    const data: {
      first: IGaugeChartDataNode[];
      second: IGaugeChartDataNode[];
    } = {
      first: Array.from(Array(chunks.first).keys()).map(item => {
        const mod = 10;
        return <IGaugeChartDataNode>{
          key: 'value',
          y: (item + 1) * mod,
        };
      }),
      second: Array.from(Array(chunks.second).keys()).map(item => {
        return <IGaugeChartDataNode>{
          key: 'value',
          y: item + 1,
        };
      }),
    };
    return data;
  }

  /**
   * Example gauge chart options.
   */
  private get chartOptions() {
    const options: {
      first: Partial<IGaugeChartOptions>;
      second: Partial<IGaugeChartOptions>;
      third: Partial<IGaugeChartOptions>;
    } = {
      first: <Partial<IGaugeChartOptions>>{
        chartTitle: 'Example gauge chart 1',
      },
      second: <Partial<IGaugeChartOptions>>{
        chartTitle: 'Example gauge chart 2',
        showLabels: false,
      },
      third: <Partial<IGaugeChartOptions>>{
        chartTitle: 'Example gauge chart 3',
        showLabels: false,
        showTooltips: false,
        defaultColor: 'red',
      },
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

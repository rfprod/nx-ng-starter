import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { first, map, switchMap, timer } from 'rxjs';

import {
  IForceDirectedChartData,
  IForceDirectedChartOptions,
  IForceDirectedGraphEntity,
} from '../../interfaces/force-directed-chart.interface';

/** Force directed chart example. */
@Component({
  selector: 'app-chart-examples-force-directed',
  templateUrl: './chart-examples-force-directed.component.html',
  styleUrls: ['./chart-examples-force-directed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppChartExamplesForceDirectedComponent {
  /** Sample chart data. */
  private readonly value = Object.freeze({
    domains: ['first', 'second', 'third'],
    entities: [
      { name: 'one', domains: ['first'], img: '' },
      { name: 'two', domains: ['second'], img: '' },
      { name: 'three', domains: ['third'], img: '' },
      { name: 'four', domains: ['first', 'second'], img: '' },
      { name: 'five', domains: ['second'], img: '' },
      { name: 'six', domains: ['third', 'second'], img: '' },
      { name: 'seven', domains: ['second'], img: '' },
      { name: 'eight', domains: ['third'], img: '' },
    ],
  });

  /** The chart data. */
  private get chartData() {
    const input = { ...this.value };
    const domains: IForceDirectedChartData['domains'] = input.domains.map((name, index) => ({ index, name, value: 1 }));
    const entities: IForceDirectedChartData['entities'] = input.entities.map((app, index) => ({
      index: index,
      name: app.name,
      domains: [...app.domains],
      img: app.img,
      linksCount: input.entities.reduce((accumulator, entity) => {
        const counter = entity.name === app.name ? 0 : entity.domains.filter(domain => app.domains.includes(domain)).length;
        return accumulator + counter;
      }, 0),
    }));
    const nodes: IForceDirectedGraphEntity[] = [...entities.map(item => ({ ...item, value: 1 }))];
    const links: IForceDirectedChartData['links'] = entities
      .map(entity => {
        return entity.domains.map(domain => {
          const source = domains.find(value => domain === value.name)?.index ?? -1;
          const target = entity.index;
          return { source, target };
        });
      })
      .reduce((accumulator, item) => (Array.isArray(item) ? [...accumulator, ...item] : [...accumulator, item]), [])
      .filter(link => link.source !== -1 && link.target !== -1 && typeof link.target !== 'undefined');
    const chartData: IForceDirectedChartData = {
      domains,
      entities: entities.map(item => ({
        ...item,
        linksCount: links.reduce((acc, link) => (link.target === item.index ? acc + 1 : acc), 0),
      })),
      links,
      nodes,
    };
    return chartData;
  }

  /** The chart options. */
  private get chartOptions() {
    return {
      chartTitle: 'Example force directed chart',
    } as Partial<IForceDirectedChartOptions>;
  }

  /** the breakpoint observer stream. */
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

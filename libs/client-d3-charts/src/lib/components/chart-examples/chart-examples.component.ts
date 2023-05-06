import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { first, map, switchMap, timer } from 'rxjs';

import { IBarChartOptions, TBarChartData } from '../../interfaces/bar-chart.interface';
import {
  IForceDirectedChartData,
  IForceDirectedChartOptions,
  IForceDirectedGraphEntity,
} from '../../interfaces/force-directed-chart.interface';
import { ILineChartOptions, TDateFormat, TLineChartData } from '../../interfaces/line-chart.interface';
import { IPieChartDataNode, IPieChartOptions } from '../../interfaces/pie-chart.interface';
import { IRadarChartDataNode, IRadarChartOptions } from '../../interfaces/radar-chart.interface';

@Component({
  selector: 'app-chart-examples',
  templateUrl: './chart-examples.component.html',
  styleUrls: ['./chart-examples.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppChartExamplesComponent {
  /**
   * Sample bar chart data.
   */
  public get barChartData() {
    return <TBarChartData>[
      { title: 'one', value: 1 },
      { title: 'two', value: 2 },
      { title: 'three', value: 3 },
      { title: 'four', value: 4 },
      { title: 'five', value: 5 },
    ];
  }

  /**
   * Sample line chart data.
   */
  public get lineChartData() {
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

  /**
   * Sample radar chart data.
   */
  public get radarChartData() {
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

  /**
   * Sample pie chart data.
   */
  public get pieChartData() {
    return <IPieChartDataNode[]>[
      { key: 'one', y: 1 },
      { key: 'two', y: 2 },
      { key: 'three', y: 3 },
      { key: 'four', y: 4 },
      { key: 'five', y: 5 },
      { key: 'six', y: 6 },
    ];
  }

  /**
   * Sample force directed chart data.
   */
  public get forceDirectedChartData() {
    const input = {
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
    };
    const domains: IForceDirectedChartData['domains'] = input.domains.map((name, index) => ({ index, name, value: 1 }));
    const entities: IForceDirectedChartData['entities'] = input.entities.map((app, index) => ({
      index: index,
      name: app.name,
      domains: [...app.domains],
      img: app.img,
      linksCount: 0,
    }));
    const nodes: IForceDirectedGraphEntity[] = [...entities];
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

  private readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .pipe(map(result => Object.keys(result.breakpoints).find(item => result.breakpoints[item]) ?? 'unknown'));

  public readonly barChartConfig$ = this.breakpoint$.pipe(
    switchMap(() =>
      timer(this.timeout).pipe(
        first(),
        map(() => ({ data: this.barChartData, options: this.barChartOptions() })),
      ),
    ),
  );

  public readonly lineChartConfig$ = this.breakpoint$.pipe(
    switchMap(() =>
      timer(this.timeout).pipe(
        first(),
        map(() => ({
          data: this.lineChartData,
          options: this.lineChartOptions(),
          optionsDateDdMmYy: this.lineChartOptions('dd/mm/yy'),
          optionsDateDdMmYyyy: this.lineChartOptions('dd/mm/yyyy'),
          optionsDateMmYyyy: this.lineChartOptions('mm/yyyy'),
        })),
      ),
    ),
  );

  public readonly radarChartConfig$ = this.breakpoint$.pipe(
    switchMap(() =>
      timer(this.timeout).pipe(
        first(),
        map(() => ({ data: this.radarChartData, options: this.radarChartOptions() })),
      ),
    ),
  );

  public readonly pieChartConfig$ = this.breakpoint$.pipe(
    switchMap(() =>
      timer(this.timeout).pipe(
        first(),
        map(() => ({ data: this.pieChartData, options: this.pieChartOptions() })),
      ),
    ),
  );

  public readonly forceDirectedChartConfig$ = this.breakpoint$.pipe(
    switchMap(() =>
      timer(this.timeout).pipe(
        first(),
        map(() => ({ data: this.forceDirectedChartData, options: this.forceDirectedChartOptions() })),
      ),
    ),
  );

  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  private readonly timeout = 100;

  public randomValue(range?: number) {
    const defaultRange = 100;
    return Math.floor(Math.random() * (range ?? defaultRange) + 1);
  }

  public randomTimestamp(range?: number) {
    const defaultRange = 100000000;
    return Math.floor(Math.random() * (range ?? defaultRange) + new Date().getTime());
  }

  /**
   * Example bar chart options.
   */
  public barChartOptions() {
    return <Partial<IBarChartOptions>>{
      chartTitle: 'Example bar chart',
      xAxisTitle: 'long x axis title',
      yAxisTitle: 'long y axis title',
    };
  }

  /**
   * Example line chart options.
   * @param dateFormat date format
   */
  public lineChartOptions(dateFormat: TDateFormat = 'default') {
    return <Partial<ILineChartOptions>>{
      chartTitle: `Example line chart, date format ${dateFormat}`,
      xAxisTitle: 'Date range',
      yAxisTitle: 'Value range',
      dateFormat,
    };
  }

  /**
   * Example radar chart options.
   */
  public radarChartOptions() {
    return <Partial<IRadarChartOptions>>{
      chartTitle: 'Example radar chart',
    };
  }

  /**
   * Example pie chart options.
   */
  public pieChartOptions() {
    return <Partial<IPieChartOptions>>{
      chartTitle: 'Example pie chart',
    };
  }

  /**
   * Example force directed chart options.
   */
  public forceDirectedChartOptions() {
    return <Partial<IForceDirectedChartOptions>>{
      chartTitle: 'Example force directed chart',
    };
  }
}

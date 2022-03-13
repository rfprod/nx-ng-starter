import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TBarChartData } from '../../interfaces/bar-chart.interface';
import { IForceDirectedChartData, IForceDirectedChartDataNode } from '../../interfaces/force-directed-chart.interface';
import { IPieChartDataNode } from '../../interfaces/pie-chart.interface';
import { IRadarChartDataNode } from '../../interfaces/radar-chart.interface';

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
   * Sample radar chart data.
   */
  public get radarChartData() {
    return <IRadarChartDataNode[][]>[
      [
        { axis: 'one', value: 1 },
        { axis: 'two', value: 2 },
        { axis: 'three', value: 3 },
        { axis: 'four', value: 4 },
        { axis: 'five', value: 5 },
        { axis: 'six', value: 6 },
        { axis: 'seven', value: 7 },
        { axis: 'eight', value: 8 },
        { axis: 'nine', value: 9 },
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

  public get forceDirectedChartData() {
    const input = {
      domains: ['first', 'second', 'third'],
      entities: [
        { name: 'one', domain: 'first', img: '' },
        { name: 'two', domain: 'second', img: '' },
        { name: 'three', domain: 'third', img: '' },
        { name: 'four', domain: 'first', img: '' },
        { name: 'five', domain: 'second', img: '' },
        { name: 'six', domain: 'third', img: '' },
      ],
    };
    const domains: IForceDirectedChartData['domains'] = input.domains.map((name, index) => ({ index, name, value: 1 }));
    const entities: IForceDirectedChartData['entities'] = input.entities.map((app, index) => ({
      index: index,
      name: app.name,
      domain: app.domain,
      img: app.img,
      linksCount: 0,
    }));
    const nodes: IForceDirectedChartDataNode[] = [...domains, ...entities];
    const links: IForceDirectedChartData['links'] = entities
      .map(entity => {
        const source = domains.find(value => value.name === entity.domain)?.index ?? -1;
        const target = entity.index;
        const link = { source, target };
        return link;
      })
      .filter(link => link.source !== -1 && link.target !== -1 && typeof link.target !== 'undefined');
    const chartData: IForceDirectedChartData = {
      domains,
      entities,
      links,
      nodes,
    };
    return chartData;
  }
}

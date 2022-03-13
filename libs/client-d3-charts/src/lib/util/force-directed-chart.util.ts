import { ElementRef } from '@angular/core';
import * as d3 from 'd3';

import {
  IForceDirectedChartData,
  IForceDirectedChartDataNode,
  IForceDirectedChartOptions,
} from '../interfaces/force-directed-chart.interface';

export const defaultForceDirectedChartConfig: IForceDirectedChartOptions = Object.freeze({
  width: 600,
  height: 600,
  centerCalcMod: 1.6,
  charge: {
    strength: -10,
    theta: 0.6,
    distanceMax: 2000,
  },
  distance: 75,
  fontSize: 10,
  collisionRadius: 30,
  margin: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  },
  strokeWidth: 1.5,
  labelTextWrapWidth: 60,
  color: d3.scaleOrdinal(d3.schemeCategory10),
});

const ticked = (
  link?: d3.Selection<SVGLineElement, d3.SimulationLinkDatum<IForceDirectedChartDataNode>, SVGSVGElement, unknown>,
  node?: d3.Selection<SVGCircleElement, IForceDirectedChartDataNode, SVGSVGElement, unknown>,
  text?: d3.Selection<SVGTextElement, IForceDirectedChartDataNode, SVGGElement, unknown>,
) => {
  if (typeof link !== 'undefined') {
    link
      .attr('x1', d => (d.source as IForceDirectedChartDataNode).x ?? 0)
      .attr('y1', d => (d.source as IForceDirectedChartDataNode).y ?? 0)
      .attr('x2', d => (d.target as IForceDirectedChartDataNode).x ?? 0)
      .attr('y2', d => (d.target as IForceDirectedChartDataNode).y ?? 0);
  }

  if (typeof node !== 'undefined') {
    node.attr('cx', d => d.x ?? 0).attr('cy', d => d.y ?? 0);
  }

  if (typeof text !== 'undefined') {
    const dx = 10;
    const dy = 5;
    text.attr('x', d => (d.x ?? 0) + dx).attr('y', d => (d.y ?? 0) - dy);
  }

  return 'rotate(0)';
};

const createContainer = (container: ElementRef<HTMLDivElement>, config: IForceDirectedChartOptions) => {
  const id = container.nativeElement.id ?? 'force-directed-0';

  d3.select(`#${id}`).select('svg').remove();
  const svg = d3
    .select(`#${id}`)
    .append('svg')
    .attr('width', config.width + config.margin.left + config.margin.right)
    .attr('height', config.height + config.margin.top + config.margin.bottom)
    .attr('class', id);
  const g = svg
    .append('g')
    .attr('transform', `translate(${config.width / 2 + config.margin.left},${config.height / 2 + config.margin.top})`);

  return { svg, g };
};

const applyChartData = (g: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>, data: IForceDirectedChartData) => {
  const imageXY = 10;
  g.append('defs')
    .selectAll('pattern')
    .data(data.entities)
    .enter()
    .append('pattern')
    .attr('id', (val, i) => {
      return `img-${val.index}`;
    })
    .attr('x', 0)
    .attr('y', 0)
    .attr('height', val => {
      const baseValue = 30;
      return baseValue + val.linksCount * 2;
    })
    .attr('width', val => {
      const baseValue = 30;
      return baseValue + val.linksCount * 2;
    })
    .append('image')
    .attr('x', imageXY)
    .attr('y', imageXY)
    .attr('height', val => {
      const baseValue = 30;
      return baseValue + val.linksCount * 2;
    })
    .attr('width', val => {
      const baseValue = 30;
      return baseValue + val.linksCount * 2;
    })
    .attr('xlink:href', val => {
      return val.img;
    });
};

const createLinks = (
  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, unknown>,
  config: IForceDirectedChartOptions,
  data: IForceDirectedChartData,
) => {
  return svg
    .selectAll('.link')
    .data(data.links)
    .enter()
    .append('line')
    .attr('class', 'link')
    .style('stroke', '#000000')
    .style('stroke-width', config.strokeWidth);
};

const createForces = (config: IForceDirectedChartOptions, data: IForceDirectedChartData) => {
  return d3
    .forceSimulation(data.nodes)
    .force(
      'link',
      d3.forceLink().id(d => d.index ?? 0),
    )
    .force('charge', d3.forceManyBody().strength(config.charge.strength).theta(config.charge.theta).distanceMax(config.charge.distanceMax))
    .force('center', d3.forceCenter(config.width / config.centerCalcMod, config.height / config.centerCalcMod))
    .force(
      'collision',
      d3.forceCollide().radius(d => config.collisionRadius),
    )
    .force(
      'link',
      d3
        .forceLink(data.links)
        .id(d => d.index ?? 0)
        .distance(config.distance)
        .links(data.links),
    );
};

const createNodes = (
  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, unknown>,
  data: IForceDirectedChartData,
  force: d3.Simulation<IForceDirectedChartDataNode, undefined>,
) => {
  return svg
    .selectAll('.node')
    .data(data.nodes)
    .enter()
    .append('circle')
    .attr('class', 'node')
    .attr('r', val => {
      const baseValue = 25;
      const valueMultiplier = 3;
      const linksCountMultiplier = 1.001;
      return typeof val.value !== 'undefined' ? 2 + val.value * valueMultiplier : baseValue + (val.linksCount ?? 0) * linksCountMultiplier;
    })
    .style('stroke-width', val => {
      const valueMultiplier = 3;
      const linksCountMultiplier = 1.001;
      return typeof val.value !== 'undefined' ? 2 + val.value * valueMultiplier : 2 + (val.linksCount ?? 0) * linksCountMultiplier;
    })
    .style('fill', val => {
      return typeof val.value !== 'undefined' ? '#f00000' : `url(#img-${val.index})`;
    })
    .call(
      d3
        .drag<SVGCircleElement, IForceDirectedChartDataNode>()
        .on(
          'start',
          function (
            this: SVGCircleElement,
            event: d3.D3DragEvent<SVGCircleElement, IForceDirectedChartDataNode, unknown>,
            datum: IForceDirectedChartDataNode,
          ) {
            if (!event.active && typeof force !== 'undefined') {
              const alphaTarget = 0.3;
              force.alphaTarget(alphaTarget).restart();
            }
            datum.fx = datum.x;
            datum.fy = datum.y;
          },
        )
        .on(
          'drag',
          function (
            this: SVGCircleElement,
            event: d3.D3DragEvent<SVGCircleElement, IForceDirectedChartDataNode, unknown>,
            datum: IForceDirectedChartDataNode,
          ) {
            datum.fx = event.x;
            datum.fy = event.y;
          },
        )
        .on(
          'end',
          function (
            this: SVGCircleElement,
            event: d3.D3DragEvent<SVGCircleElement, IForceDirectedChartDataNode, unknown>,
            datum: IForceDirectedChartDataNode,
          ) {
            if (!event.active && typeof force !== 'undefined') {
              force.alphaTarget(0);
            }
            datum.fx = null;
            datum.fy = null;
          },
        ),
    );
};

const createText = (svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, unknown>, data: IForceDirectedChartData) => {
  return svg
    .append('g')
    .selectAll('text')
    .data(data.nodes)
    .enter()
    .append('text')
    .text(val => val.domain ?? val.name ?? '');
};

export const drawForceDirectedChart = (
  container: ElementRef<HTMLDivElement>,
  data: IForceDirectedChartData,
  options?: Partial<IForceDirectedChartOptions>,
) => {
  const config: IForceDirectedChartOptions = { ...defaultForceDirectedChartConfig };
  if (typeof options !== 'undefined') {
    for (const i in options) {
      if (typeof options[i] !== 'undefined') {
        config[i] = options[i];
      }
    }
  }

  const { svg, g } = createContainer(container, config);

  applyChartData(g, data);

  const link = createLinks(svg, config, data);

  const force = createForces(config, data);

  const node = createNodes(svg, data, force);

  const text = createText(svg, data);

  force.on('tick', () => {
    ticked(link, node, text);
  });

  return config;
};

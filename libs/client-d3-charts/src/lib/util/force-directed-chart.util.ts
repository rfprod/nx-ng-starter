import { ElementRef } from '@angular/core';
import * as d3 from 'd3';

import {
  IForceDirectedChartData,
  IForceDirectedChartDataNode,
  IForceDirectedChartOptions,
} from '../interfaces/force-directed-chart.interface';

/**
 * Force directed chart default configuration.
 */
export const defaultForceDirectedChartConfig: IForceDirectedChartOptions = Object.freeze({
  chartTitle: '',
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

/**
 * Force tick handler.
 * @param link chart links
 * @param node chart nodes
 * @param text chart text
 * @returns
 */
const ticked = (
  link?: d3.Selection<SVGLineElement, d3.SimulationLinkDatum<IForceDirectedChartDataNode>, SVGSVGElement, unknown>,
  node?: d3.Selection<SVGCircleElement, IForceDirectedChartDataNode, SVGSVGElement, unknown>,
  text?: d3.Selection<SVGTextElement, IForceDirectedChartDataNode, SVGGElement, unknown>,
) => {
  if (typeof link !== 'undefined') {
    link
      .attr('x1', d => (d.source as { x: number; y: number }).x ?? 0)
      .attr('y1', d => (d.source as { x: number; y: number }).y ?? 0)
      .attr('x2', d => (d.target as { x: number; y: number }).x ?? 0)
      .attr('y2', d => (d.target as { x: number; y: number }).y ?? 0);
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

/**
 * Creates force directed chart container.
 * @param container chart container
 * @param config chart ocnfiguration
 * @returns references to svg and g elements
 */
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

/**
 * Applies force directed chart data.
 * @param g svg g element
 * @param data chart data
 */
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

/**
 * Creates force directed chart links.
 * @param svg svg element reference
 * @param config chart configuration
 * @param data chart data
 * @returns chart links
 */
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

/**
 * Creates force directed chart forces.
 * @param config chart configuration
 * @param data chart data
 * @returns chart forces
 */
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

/**
 * Force directed chart node drag start handler.
 * @param event drag event
 * @param datum chart data
 * @param force chart forces
 */
const nodeDragStartHandler = (
  event: d3.D3DragEvent<SVGCircleElement, IForceDirectedChartDataNode, unknown>,
  datum: IForceDirectedChartDataNode,
  force: d3.Simulation<IForceDirectedChartDataNode, undefined>,
) => {
  if (!event.active && typeof force !== 'undefined') {
    const alphaTarget = 0.3;
    force.alphaTarget(alphaTarget).restart();
  }
  datum.fx = event.x;
  datum.fy = event.y;
};

/**
 * Force directed chart node drag handler.
 * @param event drag event
 * @param datum chart data
 * @param config chart configuration
 */
const nodeDragHandler = (
  event: d3.D3DragEvent<SVGCircleElement, IForceDirectedChartDataNode, unknown>,
  datum: IForceDirectedChartDataNode,
  config: IForceDirectedChartOptions,
) => {
  datum.fx = event.x > config.margin.left && event.x < config.width + config.margin.right ? event.x : datum.fx;
  datum.fy = event.y > config.margin.top && event.y < config.width + config.margin.bottom ? event.y : datum.fy;
};

/**
 * Force directed chart node drag end handler.
 * @param event drag event
 * @param datum chart data
 * @param force chart forces
 */
const nodeDragEndHandler = (
  event: d3.D3DragEvent<SVGCircleElement, IForceDirectedChartDataNode, unknown>,
  datum: IForceDirectedChartDataNode,
  force: d3.Simulation<IForceDirectedChartDataNode, undefined>,
) => {
  if (!event.active && typeof force !== 'undefined') {
    force.alphaTarget(0);
  }
  datum.fx = null;
  datum.fy = null;
};

/**
 * Creates force directed chart nodes.
 * @param svg svg element reference
 * @param data chart data
 * @param force chart forces
 * @param config chart configuration
 * @returns chart nodes
 */
const createNodes = (
  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, unknown>,
  data: IForceDirectedChartData,
  force: d3.Simulation<IForceDirectedChartDataNode, undefined>,
  config: IForceDirectedChartOptions,
) => {
  return svg
    .selectAll('.node')
    .data(data.nodes)
    .enter()
    .append('circle')
    .attr('class', 'node')
    .attr('r', val => {
      const base = 5;
      return base + (val.value ?? 0) + (val.linksCount ?? 0) * 2;
    })
    .style('stroke-width', val => {
      const base = 5;
      return base + (val.value ?? 0) + (val.linksCount ?? 0) * 2;
    })
    .style('fill', val => (typeof val.img === 'undefined' || val.img === '' ? '#f00000' : `url(${val.img})`))
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
            nodeDragStartHandler(event, datum, force);
          },
        )
        .on(
          'drag',
          function (
            this: SVGCircleElement,
            event: d3.D3DragEvent<SVGCircleElement, IForceDirectedChartDataNode, unknown>,
            datum: IForceDirectedChartDataNode,
          ) {
            nodeDragHandler(event, datum, config);
          },
        )
        .on(
          'end',
          function (
            this: SVGCircleElement,
            event: d3.D3DragEvent<SVGCircleElement, IForceDirectedChartDataNode, unknown>,
            datum: IForceDirectedChartDataNode,
          ) {
            nodeDragEndHandler(event, datum, force);
          },
        ),
    );
};

/**
 * Creates force directed chart text labels.
 * @param svg svg element reference
 * @param data chart data
 * @returns text labels
 */
const createText = (svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, unknown>, data: IForceDirectedChartData) => {
  return svg
    .append('g')
    .selectAll('text')
    .data(data.nodes)
    .enter()
    .append('text')
    .attr('class', 'legend')
    .text(val => val.name ?? `N/A (id. ${val.index})`);
};

/**
 * Draws force directed chart.
 * @param container chart container
 * @param data chart data
 * @param options chart options
 * @returns chart configuration
 */
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

  const node = createNodes(svg, data, force, config);

  const text = createText(svg, data);

  force.on('tick', () => {
    ticked(link, node, text);
  });

  return config;
};

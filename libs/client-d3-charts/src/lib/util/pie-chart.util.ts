import type { ElementRef } from '@angular/core';
import * as d3 from 'd3';

import type { IPieChartDataNode, IPieChartOptions } from '../interfaces/pie-chart.interface';
import { generateConfiguration } from './configuration.util';

/**
 * The pie chart default configuration.
 */
export const defaultPieChartConfig: IPieChartOptions = Object.freeze({
  chartTitle: '',
  width: 600,
  height: 600,
  margin: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  },
  innerRadius: 0, // increase inner radius to render a donut chart
  showLabels: true,
  labelRadiusModifier: 50,
  labelTextWrapWidth: 60,
  transitionDuration: 1000,
  color: d3.scaleOrdinal(d3.schemeCategory10),
} as IPieChartOptions);

/**
 * Creates a container for the pie chart.
 * @param container the chart container
 * @param config the chart configuration
 * @returns the object with the svg element and the g element
 */
const createContainer = (container: ElementRef<HTMLDivElement>, config: IPieChartOptions) => {
  const id = container.nativeElement.id ?? 'pie-0';

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
 * Draws the pie chart.
 * @param container the chart container
 * @param data the chart data
 * @param options the chart options
 * @returns the chart configuration
 */
export const drawPieChart = (container: ElementRef<HTMLDivElement>, data: IPieChartDataNode[], options?: Partial<IPieChartOptions>) => {
  const config: IPieChartOptions = generateConfiguration<IPieChartOptions>(defaultPieChartConfig, options, {});

  const { g } = createContainer(container, config);

  const pie = d3.pie<IPieChartDataNode>().value(datum => datum.y);

  const radius = Math.min(config.width, config.height) / 2;

  const arc = d3.arc<d3.PieArcDatum<IPieChartDataNode>>().innerRadius(config.innerRadius).outerRadius(radius);

  const arcs = g
    .selectAll('arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc')
    .on('mouseover', function (this, event: MouseEvent, d) {
      this.style.opacity = '0.8';

      const tooltipText = `${d.data.key}: ${d.data.y}`;

      g.append('text')
        .attr('class', 'chart-tooltip')
        .style('opacity', 0)
        .attr('dx', -config.width / (2 * 2 * 2))
        .attr('dy', config.height / 2 + config.margin.top)
        .text(tooltipText)
        .transition()
        .duration(config.transitionDuration)
        .style('opacity', 1);
    })
    .on('mouseout', function (this, event, d) {
      this.style.opacity = 'unset';
      d3.selectAll('.chart-tooltip')
        .transition()
        .duration(config.transitionDuration / 2)
        .style('opacity', 0)
        .remove();
    });

  arcs
    .append('path')
    .attr('fill', (d, i) => config.color(i.toString()))
    .attr('d', arc);

  if (config.showLabels) {
    const label = d3
      .arc<d3.PieArcDatum<IPieChartDataNode>>()
      .innerRadius(radius)
      .outerRadius(radius + config.labelRadiusModifier);

    const textDy = 5;
    arcs
      .append('text')
      .attr('class', 'legend')
      .attr('text-anchor', 'middle')
      .attr('dy', textDy)
      .attr('transform', d => `translate(${label.centroid(d)})`)
      .style('font-size', '12px')
      .text(d => d.data.y);
  }

  return config;
};

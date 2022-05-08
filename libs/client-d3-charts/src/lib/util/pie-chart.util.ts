import { ElementRef } from '@angular/core';
import * as d3 from 'd3';

import { IPieChartDataNode, IPieChartOptions } from '../interfaces/pie-chart.interface';
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
  labelRadiusModifier: 50,
  labelTextWrapWidth: 60,
  color: d3.scaleOrdinal(d3.schemeCategory10),
});

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
      d3.select('#tooltip')
        .style('left', `${event.pageX}px`)
        .style('top', `${event.pageY}px`)
        .style('opacity', 1)
        .select('#value')
        .text(d.value);
    })
    .on('mouseout', function (this, event, d) {
      d3.select('#tooltip').style('opacity', 0);
    });

  const label = d3
    .arc<d3.PieArcDatum<IPieChartDataNode>>()
    .innerRadius(radius)
    .outerRadius(radius + config.labelRadiusModifier);

  arcs
    .append('path')
    .attr('fill', (d, i) => config.color(i.toString()))
    .attr('d', arc);

  const textDy = 5;
  arcs
    .append('text')
    .attr('class', 'legend')
    .attr('text-anchor', 'middle')
    .attr('dy', textDy)
    .attr('transform', d => `translate(${label.centroid(d)})`)
    .text(d => d.data.y);

  return config;
};

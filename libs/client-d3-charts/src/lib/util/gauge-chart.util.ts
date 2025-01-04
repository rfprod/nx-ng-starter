import type { ElementRef } from '@angular/core';
import * as d3 from 'd3';

import type { IGaugeChartDataNode, IGaugeChartOptions } from '../interfaces/gauge-chart.interface';
import { generateConfiguration } from './configuration.util';

/**
 * The gauge chart default configuration.
 */
export const defaultGaugeChartConfig: IGaugeChartOptions = Object.freeze({
  chartTitle: '',
  width: 600,
  height: 600,
  margin: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  },
  innerRadius: 100, // increase inner radius to reduce thickness of the chart
  showLabels: true,
  showTooltips: true,
  labelRadiusModifier: 50,
  labelTextWrapWidth: 60,
  transitionDuration: 1000,
  color: 'green',
  defaultColor: 'lightgray',
  value: 10,
  padRad: 0.01,
  labelFontSize: 12,
  valueFontSize: 18,
} as IGaugeChartOptions);

/**
 * Creates a container for the gauge chart.
 * @param container the chart container
 * @param config the chart configuration
 * @returns the object with the svg element and the g element
 */
const createContainer = (container: ElementRef<HTMLDivElement>, config: IGaugeChartOptions) => {
  const id = container.nativeElement.id ?? 'gauge-0';

  d3.select(`#${id}`).select('svg').remove();
  const svg = d3
    .select(`#${id}`)
    .append('svg')
    .attr('width', config.width + config.margin.left + config.margin.right)
    .attr('height', config.height / 2 + config.margin.top + config.margin.bottom)
    .attr('class', id);
  const g = svg
    .append('g')
    .attr('transform', `translate(${config.width / 2 + config.margin.left},${config.height / 2 + config.margin.top})`);

  return { svg, g };
};

/**
 * Percentage to degrees converter.
 * @param perc percentage
 */
const percToDeg = (perc: number) => {
  const mod = 360;
  return perc * mod;
};

/**
 * Degrees to percentage converter.
 * @param deg degrees
 */
const degToRad = (deg: number) => {
  const mod = 180;
  return (deg * Math.PI) / mod;
};

/**
 * Repcentage to radians converter.
 * @param perc percentage
 */
const percToRad = (perc: number) => degToRad(percToDeg(perc));

/**
 * Draws the gauge chart sections.
 * @param config the chart config
 * @param arc the charts's arc
 * @param arcs the chart's arc sections
 * @param data the chart's data
 */
const drawSections = (
  config: IGaugeChartOptions,
  arc: d3.Arc<unknown, d3.PieArcDatum<IGaugeChartDataNode>>,
  arcs: d3.Selection<SVGGElement, d3.PieArcDatum<IGaugeChartDataNode>, SVGGElement, unknown>,
  data: IGaugeChartDataNode[],
) => {
  let startAt = 0.75; // Start at 270deg
  const sectionPercentage = 1 / data.length / 2;

  arcs
    .append('path')
    .attr('fill', d => (d.data.y <= config.value ? config.color : config.defaultColor))
    .attr('opacity', (d, i) => {
      const total = 100;
      const sections = data.length - 1;
      return ((i + 1) * sections) / total;
    })
    .attr('d', datum => {
      const arcStartRad = percToRad(startAt);
      const arcEndRad = arcStartRad + percToRad(sectionPercentage);
      startAt += sectionPercentage;

      const startPadRad = datum.index === 0 ? 0 : config.padRad / 2;
      const endPadRad = datum.index === data.length ? 0 : config.padRad / 2;
      return arc.startAngle(arcStartRad + startPadRad).endAngle(arcEndRad - endPadRad)(datum);
    });
};

/**
 * Draws the guage chart labels
 * @param config the chart config
 * @param arc the charts's arc
 * @param arcs the chart's arc sections
 * @param data the chart's data
 */
const drawLabels = (
  config: IGaugeChartOptions,
  arc: d3.Arc<unknown, d3.PieArcDatum<IGaugeChartDataNode>>,
  arcs: d3.Selection<SVGGElement, d3.PieArcDatum<IGaugeChartDataNode>, SVGGElement, unknown>,
  data: IGaugeChartDataNode[],
) => {
  let startAt = 0.75; // Start at 270deg
  const sectionPercentage = 1 / data.length / 2;
  const textDy = 5;

  arcs
    .append('text')
    .attr('class', 'legend')
    .attr('text-anchor', 'middle')
    .attr('dy', textDy)
    .attr('transform', datum => {
      const arcStartRad = percToRad(startAt);
      const arcEndRad = arcStartRad + percToRad(sectionPercentage);
      startAt += sectionPercentage;

      const startPadRad = datum.index === 0 ? 0 : config.padRad / 2;
      const endPadRad = datum.index === data.length ? 0 : config.padRad / 2;
      const a = arc.startAngle(arcStartRad + startPadRad).endAngle(arcEndRad - endPadRad);
      return `translate(${a.centroid(datum)})`;
    })
    .style('font-size', `${config.labelFontSize}px`)
    .text(d => d.data.y);
};

/**
 * Draws the gauge chart value.
 * @param config the chart config
 * @param g the gauge chart container
 * @param radius the chart radius
 */
const drawValue = (config: IGaugeChartOptions, g: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>, radius: number) => {
  const mod = 20;
  g.append('text')
    .attr('class', 'legend')
    .attr('text-anchor', 'middle')
    .attr('dx', radius / mod)
    .attr('dy', -(radius / mod))
    .style('font-size', `${config.valueFontSize}px`)
    .text(() => `${config.value}%`);
};

/**
 * Draws the gauge chart.
 * @param container the chart container
 * @param data the chart data
 * @param options the chart options
 * @returns the chart configuration
 */
export const drawGaugeChart = (
  container: ElementRef<HTMLDivElement>,
  data: IGaugeChartDataNode[],
  options?: Partial<IGaugeChartOptions>,
) => {
  const config: IGaugeChartOptions = generateConfiguration<IGaugeChartOptions>(defaultGaugeChartConfig, options, {});

  const { g } = createContainer(container, config);

  const gauge = d3.pie<IGaugeChartDataNode>().value(datum => datum.y);

  const radius = Math.min(config.width, config.height) / 2;

  const arc = d3.arc<d3.PieArcDatum<IGaugeChartDataNode>>().innerRadius(config.innerRadius).outerRadius(radius);

  const arcs = g
    .selectAll('arc')
    .data(gauge(data))
    .enter()
    .append('g')
    .attr('class', 'arc')
    .on('mouseover', function (this, event: MouseEvent, d) {
      this.style.opacity = '0.8';

      const displayTooltip = d.data.y <= config.value && config.showTooltips;

      if (displayTooltip) {
        const tooltipText = `${d.data.key}: ${d.data.y}`;

        g.append('text')
          .attr('class', 'chart-tooltip')
          .style('opacity', 0)
          .attr('dx', -config.width / (2 * 2 * 2))
          .attr('dy', radius / 2 - config.margin.top - config.margin.bottom)
          .text(tooltipText)
          .transition()
          .duration(config.transitionDuration)
          .style('opacity', 1);
      }
    })
    .on('mouseout', function (this, event, d) {
      this.style.opacity = 'unset';
      d3.selectAll('.chart-tooltip')
        .transition()
        .duration(config.transitionDuration / 2)
        .style('opacity', 0)
        .remove();
    });

  drawSections(config, arc, arcs, data);

  if (config.showLabels) {
    drawLabels(config, arc, arcs, data);
  }

  drawValue(config, g, radius);

  return config;
};

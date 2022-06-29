import { ElementRef } from '@angular/core';
import * as d3 from 'd3';

import { IRadarChartDataNode, IRadarChartOptions, TRadarChartData } from '../interfaces/radar-chart.interface';
import { generateConfiguration } from './configuration.util';

/**
 * The radar chart default configuration.
 */
export const defaultRadarChartConfig: IRadarChartOptions = Object.freeze(<IRadarChartOptions>{
  chartTitle: '',
  width: 350,
  height: 350,
  margin: {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
  },
  levels: 3, // how many levels or inner circles should there be drawn
  maxValue: 0, // what is the value that the biggest circle will represent
  lineFactor: 1.1, // how much farther than the radius of the outer circle should the lines be stretched
  labelFactor: 1.15, // how much farther than the radius of the outer circle should the labels be placed
  labelTextWrapWidth: 60, // the number of pixels after which a label needs to be given a new line
  opacityArea: 0.35, // the opacity of the area of the blob
  dotRadius: 4, // the size of the colored circles of each blog
  opacityCircles: 0.1, // the opacity of the circles of each blob
  strokeWidth: 2, // the width of the stroke around each blob
  roundStrokes: false, // if true the area and stroke will follow a round path (cardinal-closed)
  transitionDuration: 200,
  color: d3.scaleOrdinal(d3.schemeCategory10),
});

/**
 * Creates a container for the radar chart.
 * @param container the chart container
 * @param config the chart configuration
 * @returns the object with the svg element and the g element
 */
const createContainer = (container: ElementRef<HTMLDivElement>, config: IRadarChartOptions) => {
  const id = container.nativeElement.id ?? 'radar-0';

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
 * Draws the radar chart circular grid.
 * @param axisGrid the chart axis grid
 * @param radius the chart radius value
 * @param maxValue the maximum value of the chart axis
 * @param config the chart configuration
 */
const drawCircularGrid = (
  axisGrid: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>,
  radius: number,
  maxValue: number,
  config: IRadarChartOptions,
) => {
  // background circles
  axisGrid
    .selectAll('.levels')
    .data(d3.range(1, config.levels + 1).reverse())
    .enter()
    .append('circle')
    .attr('class', 'grid-circle')
    .attr('r', (d, i) => (radius / config.levels) * d)
    .style('fill', '#CDCDCD')
    .style('stroke', '#CDCDCD')
    .style('fill-opacity', config.opacityCircles)
    .style('filter', 'url(#glow)');
  // text indicating at what % each level is
  const axisGridX = 4;
  axisGrid
    .selectAll('.axis-label')
    .data(d3.range(1, config.levels + 1).reverse())
    .enter()
    .append('text')
    .attr('class', 'axis-label')
    .attr('x', axisGridX)
    .attr('y', d => (-d * radius) / config.levels)
    .attr('dy', '0.4em')
    .style('font-size', '10px')
    .attr('fill', '#737373')
    .text((d, i) => (maxValue * d) / config.levels);
};

/**
 * Wraps the chart axis labels text.
 * @param svgText the svg text elements
 * @param width the chart axis label width
 */
const wrapSvgText = (svgText: d3.Selection<SVGTextElement, string, SVGGElement, unknown>, width: number) => {
  svgText.each(function (this: SVGTextElement) {
    const text = d3.select<SVGElement, string>(this);
    const words = text.text().split(/\s+/).reverse();
    let line: string[] = [];
    let lineNumber = 0;
    const lineHeight = 1.4;
    const y = text.attr('y');
    const x = text.attr('x');
    const dy = parseFloat(text.attr('dy') ?? 0);
    let tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('dy', `${dy}em`);

    let word = words.pop();

    while (typeof word !== 'undefined') {
      line.push(word ?? '');
      tspan.text(line.join(' '));
      if ((tspan.node()?.getComputedTextLength() ?? 0) > width) {
        line.pop();
        tspan.text(line.join(' '));
        line = [word ?? ''];
        lineNumber += 1;
        tspan = text
          .append('tspan')
          .attr('x', x)
          .attr('y', y)
          .attr('dy', `${lineNumber * lineHeight + dy}em`)
          .text(word ?? '');
      }
      word = words.pop();
    }
  });
};

/**
 * Creates the legend.
 * @param g the svg g element
 * @param config the chart configuration
 */
const createLegend = (g: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>, config: IRadarChartOptions) => {
  if (config.chartTitle !== '') {
    g.append('g')
      .attr('transform', `translate(-${config.width / 2 + config.margin.left / 2}, -${config.height / 2 + config.margin.top / 2})`)
      .append('text')
      .style('font-size', '12px')
      .attr('class', 'legend')
      .text(config.chartTitle);
  }
};

/**
 * Draws the radar chart axis.
 * @param axisGrid the chart axis grid
 * @param axisNames the chart axis names
 * @param radiusScale the chart radius scale
 * @param maxValue the maximum value of the chart axis
 * @param angleSlice the chart angle slice value
 * @param config the chart configuration
 */
const drawAxis = (
  axisGrid: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>,
  axisNames: string[],
  radiusScale: d3.ScaleLinear<number, number>,
  maxValue: number,
  angleSlice: number,
  config: IRadarChartOptions,
) => {
  // create the straight lines radiating outward from the center
  const axis = axisGrid.selectAll('.axis').data(axisNames).enter().append('g').attr('class', 'axis');
  // append the lines
  axis
    .append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', (d, i) => radiusScale(maxValue * config.lineFactor) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr('y2', (d, i) => radiusScale(maxValue * config.lineFactor) * Math.sin(angleSlice * i - Math.PI / 2))
    .attr('class', 'line')
    .style('stroke', 'white')
    .style('stroke-width', '2px');
  // append the labels at each axis
  axis
    .append('text')
    .attr('class', 'legend')
    .style('font-size', '11px')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .attr('x', (d, i) => radiusScale(maxValue * config.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr('y', (d, i) => radiusScale(maxValue * config.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2))
    .text(d => d)
    .call(wrapSvgText, config.labelTextWrapWidth);
};

/**
 * Draws the radar chart blobs.
 * @param radiusScale the chart radius scale
 * @param angleSlice the chart angle slice value
 * @param g the svg g element
 * @param data the chart data
 * @param config the chart configuration
 */
const drawRadarChartBlobs = (
  radiusScale: d3.ScaleLinear<number, number>,
  angleSlice: number,
  g: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>,
  data: TRadarChartData,
  config: IRadarChartOptions,
) => {
  // the radial line function
  const radarLine = d3
    .lineRadial<IRadarChartDataNode>()
    .radius(d => radiusScale(d.value))
    .angle((d, i) => i * angleSlice);
  // create a wrapper for the blobs
  const blobWrapper = g.selectAll('.radar-wrapper').data(data).enter().append('g').attr('class', 'radar-wrapper');
  // append the backgrounds
  blobWrapper
    .append('path')
    .attr('class', 'radar-area')
    .attr('d', (d, i) => radarLine(d))
    .style('fill', (d, i) => config.color(i.toString()))
    .style('fill-opacity', config.opacityArea)
    .on('mouseover', function (d, i) {
      // dim all blobs
      const radarAreaFillOpacity = 0.1;
      d3.selectAll('.radar-area').transition().duration(config.transitionDuration).style('fill-opacity', radarAreaFillOpacity);
      // bring back the hovered over blob
      const fillOpacity = 0.7;
      d3.select(this).transition().duration(config.transitionDuration).style('fill-opacity', fillOpacity);
    })
    .on('mouseout', () => {
      // bring back all blobs
      d3.selectAll('.radar-area').transition().duration(config.transitionDuration).style('fill-opacity', config.opacityArea);
    });
  // create the outlines
  blobWrapper
    .append('path')
    .attr('class', 'radar-stroke')
    .attr('d', (d, i) => radarLine(d))
    .style('stroke-width', `${config.strokeWidth}px`)
    .style('stroke', (d, i) => config.color(i.toString()))
    .style('fill', 'none')
    .style('filter', 'url(#glow)');
  // append the circles
  const blobWrapperFillOpacity = 0.8;
  blobWrapper
    .selectAll('.radar-circle')
    .data((d, i) => d)
    .enter()
    .append('circle')
    .attr('class', 'radar-circle')
    .attr('r', config.dotRadius)
    .attr('cx', (d, i) => radiusScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr('cy', (d, i) => radiusScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
    .style('fill', (d, i, j) => config.color(j.toString()))
    .style('fill-opacity', blobWrapperFillOpacity);
};

/**
 * Appends the invisible tooltip circles.
 * @param g the svg g element
 * @param data the chart data
 * @param radiusScale the chart radius scale
 * @param angleSlice the chart angle slice value
 * @param config the chart configuration
 */
const appendInvisibleTooltipCircles = (
  g: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>,
  data: TRadarChartData,
  radiusScale: d3.ScaleLinear<number, number>,
  angleSlice: number,
  config: IRadarChartOptions,
) => {
  // wrapper for the invisible circles on top
  const blobCircleWrapper = g.selectAll('.radar-circle-wrapper').data(data).enter().append('g').attr('class', 'radar-circle-wrapper');
  // set up the small tooltip for when you hover over a circle
  const tooltip = g.append('text').attr('class', 'tooltip').style('opacity', 0);
  // append a set of invisible circles on top for the mouseover pop-up
  const blobCircleWrapperRadiusMultiplier = 1.5;
  blobCircleWrapper
    .selectAll<SVGElement, IRadarChartDataNode>('.radar-invisible-circle')
    .data((d, i) => d)
    .enter()
    .append('circle')
    .attr('class', 'radar-invisible-circle')
    .attr('r', config.dotRadius * blobCircleWrapperRadiusMultiplier)
    .attr('cx', (d, i) => radiusScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr('cy', (d, i) => radiusScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
    .style('fill', 'none')
    .style('pointer-events', 'all')
    .on('mouseover', function (event: MouseEvent, i) {
      const modifier = 10;
      const newX = parseFloat(d3.select(this).attr('cx')) - modifier;
      const newY = parseFloat(d3.select(this).attr('cy')) - modifier;

      const nodeData = (event.target as unknown as Record<string, IRadarChartDataNode>)['__data__'];
      const tooltipText = `${nodeData.value} ${nodeData.unit}`;
      tooltip.attr('x', newX).attr('y', newY).text(tooltipText).transition().duration(config.transitionDuration).style('opacity', 1);
    })
    .on('mouseout', () => {
      tooltip.transition().duration(config.transitionDuration).style('opacity', 0);
    });
};

/**
 * Draws the radar chart.
 * @param container the chart container
 * @param data the chart data
 * @param options the chart options
 * @returns the hart configuration
 */
export const drawRadarChart = (container: ElementRef<HTMLDivElement>, data: TRadarChartData, options?: Partial<IRadarChartOptions>) => {
  const config: IRadarChartOptions = generateConfiguration<IRadarChartOptions>(defaultRadarChartConfig, options, {});

  const maxValue = Math.max(config.maxValue, d3.max(data, i => d3.max(i.map(o => o.value))) ?? 0);
  const axisNames = data[0].map((i, j) => i.axis);
  const totalAxis = axisNames.length;
  const radius = Math.min(config.width / 2 - config.margin.left / 2, config.height / 2 - config.margin.top / 2);
  const angleSlice = (Math.PI * 2) / totalAxis;
  const radiusScale = d3.scaleLinear([0, radius]).domain([0, maxValue]);

  const { g } = createContainer(container, config);

  // filter for the outside glow
  const filter = g.append('defs').append('filter').attr('id', 'glow');
  filter.append('feGaussianBlur').attr('stdDeviation', '2.5').attr('result', 'coloredBlur');
  const feMerge = filter.append('feMerge');
  feMerge.append('feMergeNode').attr('in', 'coloredBlur');
  feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

  const axisGrid = g.append('g').attr('class', 'axis-wrapper');

  drawCircularGrid(axisGrid, radius, maxValue, config);

  drawAxis(axisGrid, axisNames, radiusScale, maxValue, angleSlice, config);

  createLegend(g, config);

  drawRadarChartBlobs(radiusScale, angleSlice, g, data, config);

  appendInvisibleTooltipCircles(g, data, radiusScale, angleSlice, config);

  return config;
};

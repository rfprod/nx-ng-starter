import type { ElementRef } from '@angular/core';
import * as d3 from 'd3';

import type { ILineChartDataNode, ILineChartOptions, TLineChartData } from '../interfaces/line-chart.interface';
import { generateConfiguration } from './configuration.util';

/** The line chart default configuration. */
export const defaultLineChartConfig: ILineChartOptions = Object.freeze({
  chartTitle: '',
  width: 350,
  height: 350,
  margin: {
    top: 70,
    right: 50,
    bottom: 50,
    left: 50,
  },
  transitionDuration: 400,
  dotRadius: 3.5,
  xAxisTitle: '',
  yAxisTitle: '',
  ticks: {
    x: 5,
    y: 10,
  },
  displayAxisLabels: true,
  dateFormat: 'default',
  labelTextWrapWidth: 20, // the number of pixels after which a label needs to be given a new line
  color: d3.scaleOrdinal(d3.schemeCategory10),
} as ILineChartOptions);

/**
 * Creates a container for the line chart.
 * @param container the chart container
 * @param config the chart configuration
 * @returns the object with the svg element and the g element
 */
const createContainer = (container: ElementRef<HTMLDivElement>, config: ILineChartOptions) => {
  const id = container.nativeElement.id ?? 'line-0';

  d3.select(`#${id}`).select('svg').remove();
  const svg = d3
    .select(`#${id}`)
    .append('svg')
    .attr('width', config.width + config.margin.left + config.margin.right)
    .attr('height', config.height + config.margin.top + config.margin.bottom)
    .attr('class', id);
  const g = svg.append('g').attr('transform', `translate(${config.margin.left},${config.margin.top / 2})`);

  return { svg, g };
};

/**
 * Wraps the line chart axis labels text.
 * @param svgText the svg text elements
 * @param width the chart axis label width
 */
const wrapSvgText = (svgText: d3.Selection<d3.BaseType, unknown, SVGGElement, unknown>, width: number) => {
  svgText.each(function (this: d3.BaseType) {
    const text = d3.select<d3.BaseType, string>(this);
    const words = text.text().split(/\s+/).reverse();
    if (words.length > 1) {
      let line: string[] = [];
      let lineNumber = 0;
      const lineHeight = 1.4;
      const y = text.attr('y');
      const x = text.attr('x');
      const dy = parseFloat(text.attr('dy') ?? 0);
      let tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('dy', `${dy}em`); // axis label

      let word = words.pop();

      while (typeof word !== 'undefined') {
        line.push(word ?? '');
        tspan.text(line.join(' '));
        if ((tspan.node()?.getComputedTextLength() ?? 0) > width) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word ?? ''];
          tspan = text
            .append('tspan')
            .attr('x', 0)
            .attr('y', y)
            .attr('dy', `${lineNumber * lineHeight + dy}em`)
            .text(word ?? '');
          lineNumber += 1;
        }
        word = words.pop();
      }
    }
  });
};

/**
 * Creates the legend.
 * @param g the svg g element
 * @param config the chart configuration
 */
const createLegend = (g: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>, config: ILineChartOptions) => {
  if (config.displayAxisLabels && config.xAxisTitle !== '') {
    g.append('g')
      .attr('transform', `translate(0, ${config.height + config.margin.bottom})`)
      .append('text')
      .style('font-size', '12px')
      .attr('class', 'legend')
      .attr('dx', '0.5em')
      .attr('dy', '0em')
      .text(`x - ${config.xAxisTitle}`);
  }

  if (config.displayAxisLabels && config.yAxisTitle !== '') {
    g.append('g')
      .attr('transform', `translate(0, ${config.height + config.margin.bottom})`)
      .append('text')
      .style('font-size', '12px')
      .attr('class', 'legend')
      .attr('dx', '0.5em')
      .attr('dy', '1.5em')
      .text(`y - ${config.yAxisTitle}`);
  }

  if (config.chartTitle !== '') {
    g.append('g')
      .attr('transform', `translate(0, 0)`)
      .append('text')
      .style('font-size', '12px')
      .attr('class', 'legend')
      .attr('dx', '1.5em')
      .attr('dy', '-2em')
      .text(config.chartTitle);
  }
};

/**
 * Creates the x axis.
 * @param g the svg g element
 * @param x the x axis scale
 * @param config the chart configuration
 */
const createAxisX = (
  g: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>,
  x: d3.ScaleTime<number, number>,
  config: ILineChartOptions,
) => {
  const xLabels = g
    .append('g')
    .attr('transform', `translate(0, ${config.height})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(config.ticks.x)
        .tickFormat(d => {
          const date = new Date(d.valueOf());
          const formattingOffset = 10;
          const day = date.getDate();
          const dd = day < formattingOffset ? `0${day}` : day;
          const month = date.getMonth() + 1;
          const mm = month < formattingOffset ? `0${month}` : month;
          const year = date.getFullYear().toString();
          const yy = year.slice(2);
          const hours = date.getHours();
          const hour = hours < formattingOffset ? `0${hours}` : hours;
          const minutes = date.getMinutes();
          const minute = minutes < formattingOffset ? `0${minutes}` : minutes;
          let formattedDate = `${dd}/${mm}/${yy} ${hour}:${minute}`;
          switch (config.dateFormat) {
            case 'dd/mm/yyyy':
              formattedDate = `${dd}/${mm}/${year}`;
              break;
            case 'dd/mm/yy':
              formattedDate = `${dd}/${mm}/${yy}`;
              break;
            case 'mm/yyyy':
              formattedDate = `${mm}/${year}`;
              break;
            case 'yyyy':
              formattedDate = `${year}`;
              break;
            default:
              break;
          }
          return formattedDate;
        }),
    )
    .append('text');

  g.selectAll('text').call(wrapSvgText, config.labelTextWrapWidth);

  if (config.displayAxisLabels) {
    xLabels.attr('transform', `translate(${config.width}, 0)`).attr('class', 'legend').attr('dx', '1.5em').attr('dy', '0.7em').text('x');
  }
};

/**
 * Creates the y axis.
 * @param g the svg g element
 * @param y the y axis scale
 * @param config the chart configuration
 */
const createAxisY = (
  g: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>,
  y: d3.ScaleLinear<number, number>,
  config: ILineChartOptions,
) => {
  const yLabels = g
    .append('g')
    .call(
      d3
        .axisLeft(y)
        .ticks(config.ticks.y)
        .tickFormat(d => `${d}`),
    )
    .append('text');

  if (config.displayAxisLabels) {
    yLabels.attr('class', 'legend').attr('dy', '-1.5em').attr('class', 'legend').text('y');
  }
};

/**
 * The mouse over event handler.
 * @param self an svg circle element
 * @param d the chart data node
 * @param g the svg g element
 * @param config the chart configuration
 */
const onMouseOver = (
  self: SVGCircleElement,
  d: ILineChartDataNode,
  g: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>,
  config: ILineChartOptions,
) => {
  const duration = 400;
  d3.select(self)
    .transition()
    .duration(duration)
    .attr('r', config.dotRadius * 2);

  const tooltipShift = 4;
  const tooltipDy = -10;
  g.append('text')
    .attr('class', 'chart-tooltip')
    .style('font-size', '11px')
    .attr('dx', () => (config.width - config.margin.left - config.margin.right) / tooltipShift)
    .attr('dy', () => tooltipDy)
    .text(() => `${d.value} (${new Date(d.timestamp).toUTCString()})`)
    .transition()
    .duration(config.transitionDuration)
    .style('opacity', 1);
};

/**
 * The mouse out event handler.
 * @param self an svg circle element
 * @param config the chart configuration
 */
const onMouseOut = (self: SVGCircleElement, config: ILineChartOptions) => {
  const duration = 400;
  d3.select(self).attr('class', 'dot');
  d3.select(self).transition().duration(duration).attr('r', config.dotRadius);
  d3.selectAll('.chart-tooltip')
    .transition()
    .duration(config.transitionDuration / 2)
    .style('opacity', 0)
    .remove();
};

/**
 * Draws the chart lines, dots, and sets the mouse pointer events.
 * @param g the svg g element
 * @param x the x axis scale
 * @param y the y axis scale
 * @param config the chart configuration
 * @param data the chart data
 * @param datasetLabels the set of labels for the chart's dataset
 */
const drawLinesDotsAndSetPointerEvents = (
  g: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>,
  x: d3.ScaleTime<number, number>,
  y: d3.ScaleLinear<number, number>,
  config: ILineChartOptions,
  data: TLineChartData[],
  datasetLabels: string[],
) => {
  const line = d3
    .line<ILineChartDataNode>()
    .x(d => x(d.timestamp))
    .y(d => y(d.value))
    .curve(d3.curveMonotoneX);

  const flatData = data.flat();

  for (let c = 0, maxC = data.length; c < maxC; c += 1) {
    const chunk = data[c];

    g.append('path')
      .attr('id', `line-${c}`)
      .style('fill', 'none')
      .style('stroke', config.color(c.toString()))
      .style('stroke-width', '2px')
      .attr('d', line(chunk));

    const datasetLabelText = datasetLabels[c];
    const datasetLabel = g.append('g').attr('transform', `translate(0, ${config.height + config.margin.bottom})`);

    const markerShiftY = { multiplier: 12, modifier: 4 };
    datasetLabel
      .append('line')
      .attr('id', `legend-line-${c}`)
      .style('fill', 'none')
      .style('stroke', config.color(c.toString()))
      .style('stroke-width', '2px')
      .attr('x1', '6.75em')
      .attr('y1', c * markerShiftY.multiplier - markerShiftY.modifier)
      .attr('x2', '7.25em')
      .attr('y2', c * markerShiftY.multiplier - markerShiftY.modifier);

    datasetLabel
      .append('text')
      .style('font-size', '12px')
      .attr('class', 'legend')
      .attr('dx', '10em')
      .attr('dy', `${c}em`)
      .text(datasetLabelText);
  }

  g.selectAll('.dot')
    .data(flatData)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .style('pointer-events', 'all')
    .style('fill', (d, i) => config.color(i.toString()))
    .on('mouseover', function (this, event, d) {
      return onMouseOver(this, d, g, config);
    })
    .on('mouseout', function (this) {
      return onMouseOut(this, config);
    })
    .attr('cx', function (this, d) {
      return x(d.timestamp);
    })
    .attr('cy', function (this, d) {
      return y(d.value);
    })
    .attr('r', 0)
    .transition()
    .ease(d3.easeLinear)
    .duration(config.transitionDuration)
    .delay((d, i) => {
      const multiplier = 50;
      return i * multiplier;
    })
    .attr('r', config.dotRadius);
};

/**
 * Draws the line chart.
 * @param container the chart container
 * @param data the chart data
 * @param options the chart options
 * @returns the chart configuration
 */
export const drawLineChart = (
  container: ElementRef<HTMLDivElement>,
  data: TLineChartData[],
  datasetLabels: string[],
  options?: Partial<ILineChartOptions>,
) => {
  const config: ILineChartOptions = generateConfiguration<ILineChartOptions>(defaultLineChartConfig, options, {});

  const { g } = createContainer(container, config);

  const range = data.reduce(
    (accumulator: { minTime: number; maxTime: number; maxValue: number }, arr) => {
      const timestamps = arr.map(item => item.timestamp);
      const minItem = Math.min(...timestamps);
      const maxItem = Math.max(...timestamps);
      const minTime = Math.min(minItem, accumulator.minTime);
      const maxTime = Math.max(maxItem, accumulator.maxTime);

      const values = arr.map(item => item.value);
      const maxItemValue = Math.max(...values);
      const maxValue = Math.max(maxItemValue, accumulator.maxValue);
      return { minTime, maxTime, maxValue };
    },
    { minTime: Number(Infinity), maxTime: -Infinity, maxValue: -Infinity },
  );

  const x = d3.scaleTime([0, config.width]).domain([range.minTime, range.maxTime]);
  const y = d3.scaleLinear([config.height, 0]).domain([0, range.maxValue ?? 1]);

  createAxisX(g, x, config);

  createAxisY(g, y, config);

  createLegend(g, config);

  drawLinesDotsAndSetPointerEvents(g, x, y, config, data, datasetLabels);

  return config;
};

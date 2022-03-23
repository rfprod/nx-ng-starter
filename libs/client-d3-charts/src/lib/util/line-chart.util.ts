import { ElementRef } from '@angular/core';
import * as d3 from 'd3';

import { ILineChartDataNode, ILineChartOptions, TLineChartData } from '../interfaces/line-chart.interface';

export const defaultLineChartConfig: ILineChartOptions = Object.freeze({
  chartTitle: '',
  width: 600,
  height: 600,
  margin: {
    top: 70,
    right: 50,
    bottom: 50,
    left: 60,
  },
  transitionDuration: 400,
  dotRadius: 3.5,
  xAxisTitle: 'x',
  yAxisTitle: 'y',
  ticks: {
    x: 5,
    y: 10,
  },
  shift: {
    xAxisLabelX: 10,
    xAxisLabelY: 184,
    yAxisLabelX: -10,
    yAxisLabelY: -10,
  },
  labelTextWrapWidth: 20, // the number of pixels after which a label needs to be given a new line
  color: d3.scaleOrdinal(d3.schemeCategory10),
});

const createContainer = (container: ElementRef<HTMLDivElement>, config: ILineChartOptions) => {
  const id = container.nativeElement.id ?? 'line-0';

  d3.select(`#${id}`).select('svg').remove();
  const svg = d3
    .select(`#${id}`)
    .append('svg')
    .attr('width', config.width + config.margin.left + config.margin.right)
    .attr('height', config.height + config.margin.top + config.margin.bottom)
    .attr('class', id);
  const g = svg
    .append('g')
    .attr('transform', `translate(${config.width / 2 - config.margin.left},${config.height / 2 - config.margin.top})`);

  return { svg, g };
};

const wrapSvgText = (svgText: d3.Selection<d3.BaseType, unknown, SVGGElement, unknown>, width: number) => {
  svgText.each(function (this: d3.BaseType) {
    const text = d3.select<d3.BaseType, string>(this);
    const words = text.text().split(/\s+/).reverse();
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
        lineNumber += 1;
        tspan = text
          .append('tspan')
          .attr('x', 0)
          .attr('y', y)
          .attr('dy', `${lineNumber * lineHeight + dy}em`)
          .text(word ?? '');
      }
      word = words.pop();
    }
  });
};

const createAxisX = (
  g: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>,
  x: d3.ScaleLinear<number, number>,
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
          const day = date.getDay();
          const month = date.getMonth();
          const year = date.getFullYear().toString().slice(2);
          const hour = date.getHours();
          const minute = date.getMinutes();
          return `${day}/${month}/${year} ${hour}:${minute}`;
        }),
    )
    .append('text');

  g.selectAll('text').call(wrapSvgText, config.labelTextWrapWidth);

  xLabels
    .attr('text-anchor', 'end')
    .attr('class', 'legend')
    .attr('dy', '0.35em')
    .attr('y', config.height - config.shift.xAxisLabelY)
    .attr('x', config.width + config.shift.xAxisLabelX)
    .text(config.xAxisTitle);
};

const createAxisY = (
  g: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>,
  y: d3.ScaleLinear<number, number>,
  config: ILineChartOptions,
) => {
  g.append('g')
    .call(
      d3
        .axisLeft(y)
        .ticks(config.ticks.y)
        .tickFormat(d => `${d}`),
    )
    .append('text')
    .attr('text-anchor', 'end')
    .attr('class', 'legend')
    .attr('y', config.shift.yAxisLabelY)
    .attr('x', config.shift.yAxisLabelX)
    .text(config.yAxisTitle);
};

const onMouseOver = (
  self: SVGCircleElement,
  d: ILineChartDataNode,
  g: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>,
  x: d3.ScaleLinear<number, number>,
  y: d3.ScaleLinear<number, number>,
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
    .attr('class', 'val')
    .style('font-size', '11px')
    .attr('dx', () => (config.width - config.margin.left - config.margin.right) / tooltipShift)
    .attr('dy', () => tooltipDy)
    .text(() => `${d.value} (${new Date(d.timestamp).toUTCString()})`);
};

const onMouseOut = (self: SVGCircleElement, config: ILineChartOptions) => {
  const duration = 400;
  d3.select(self).attr('class', 'dot');
  d3.select(self).transition().duration(duration).attr('r', config.dotRadius);

  d3.selectAll('.val').remove();
};

const drawLinesDotsAndSetPointerEvents = (
  g: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>,
  x: d3.ScaleLinear<number, number>,
  y: d3.ScaleLinear<number, number>,
  config: ILineChartOptions,
  data: TLineChartData,
) => {
  const line = d3
    .line<ILineChartDataNode>()
    .x(d => x(d.timestamp))
    .y(d => y(d.value))
    .curve(d3.curveMonotoneX);

  g.append('path').attr('id', 'line').style('fill', 'none').style('stroke', 'red').style('stroke-width', '2px').attr('d', line(data));

  g.selectAll('.dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .style('pointer-events', 'all')
    .style('fill', (d, i) => config.color(i.toString()))
    .on('mouseover', function (this, event, d) {
      return onMouseOver(this, d, g, x, y, config);
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

export const drawLineChart = (container: ElementRef<HTMLDivElement>, data: TLineChartData, options?: Partial<ILineChartOptions>) => {
  const config: ILineChartOptions = { ...defaultLineChartConfig };
  if (typeof options !== 'undefined') {
    for (const i in options) {
      if (typeof options[i] !== 'undefined') {
        config[i] = options[i];
      }
    }
  }

  const { g } = createContainer(container, config);

  const x = d3.scaleLinear([0, config.width]).domain([Math.min(...data.map(d => d.timestamp)), Math.max(...data.map(d => d.timestamp))]);
  const y = d3.scaleLinear([config.height, 0]).domain([0, d3.max(data, d => d.value) ?? 1]);

  createAxisX(g, x, config);

  createAxisY(g, y, config);

  drawLinesDotsAndSetPointerEvents(g, x, y, config, data);

  return config;
};

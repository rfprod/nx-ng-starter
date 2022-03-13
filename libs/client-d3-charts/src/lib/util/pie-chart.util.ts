import { ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { arc, pie, PieArcDatum } from 'd3-shape';

import { IPieChartDataNode, IPieChartOptions, PIE_CHART_ARC_CONFIG } from '../interfaces/pie-chart.interface';

const defaultPieChartConfig: IPieChartOptions = Object.freeze({
  width: 600,
  height: 600,
  margin: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  },
  labelTextWrapWidth: 60,
  color: d3.scaleOrdinal(d3.schemeCategory10),
});

export const drawPieChart = (canvas: ElementRef<HTMLCanvasElement>, data: IPieChartDataNode[], options?: Partial<IPieChartOptions>) => {
  const config: IPieChartOptions = { ...defaultPieChartConfig };
  if (typeof options !== 'undefined') {
    for (const i in options) {
      if (typeof options[i] !== 'undefined') {
        config[i] = options[i];
      }
    }
  }

  const context = canvas.nativeElement.getContext('2d');

  if (context !== null && typeof context !== 'undefined' && typeof canvas !== 'undefined') {
    const width = canvas.nativeElement.width;
    const height = canvas.nativeElement.height;
    const radius = Math.min(width, height) / 2;

    context.clearRect(0, 0, width, height);

    const createArc = arc<PieArcDatum<IPieChartDataNode>>()
      .outerRadius(radius - PIE_CHART_ARC_CONFIG.ARC_INNER_RADIUS)
      .innerRadius(PIE_CHART_ARC_CONFIG.ARC_OUTER_RADIUS)
      .context(context);

    const createLabel = arc<PieArcDatum<IPieChartDataNode>>()
      .outerRadius(radius - PIE_CHART_ARC_CONFIG.LABEL_INNER_RADIUS)
      .innerRadius(radius - PIE_CHART_ARC_CONFIG.LABEL_OUTER_RADIUS)
      .context(context);

    const createPieChart = pie<IPieChartDataNode>().value(datum => datum.y);

    context.translate(width / 2, height / 2);

    const scale = 2;
    context.transform(scale, 0, 0, scale, 0, 0);

    const arcs = createPieChart(data);

    arcs.forEach((datum, i) => {
      context.fillStyle = config.color(i.toString());
      context.beginPath();
      createArc(datum);
      context.closePath();
      context.fill();
    });

    arcs.forEach(datum => {
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = '#000';
      const c = createLabel.centroid(datum);
      context.fillText(datum.data.key, c[0], c[1]);
    });
  }
};

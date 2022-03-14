import { InjectionToken } from '@angular/core';

import { drawBarChart } from '../util/bar-chart.util';
import { drawForceDirectedChart } from '../util/force-directed-chart.util';
import { drawLineChart } from '../util/line-chart.util';
import { drawPieChart } from '../util/pie-chart.util';
import { drawRadarChart } from '../util/radar-chart.util';

export interface ID3ChartFactory {
  drawPieChart: typeof drawPieChart;
  drawRadarChart: typeof drawRadarChart;
  drawBarChart: typeof drawBarChart;
  drawLineChart: typeof drawLineChart;
  drawForceDirectedChart: typeof drawForceDirectedChart;
}

export const d3ChartFactory = (): ID3ChartFactory => ({
  drawPieChart,
  drawRadarChart,
  drawBarChart,
  drawLineChart,
  drawForceDirectedChart,
});

export const D3_CHART_FACTORY = new InjectionToken('D3_CHART_FACTORY', {
  providedIn: 'root',
  factory: d3ChartFactory,
});

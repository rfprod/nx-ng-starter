import * as d3 from 'd3';

export interface ILineChartDataNode {
  timestamp: number;
  value: number;
}

export type TLineChartData = ILineChartDataNode[];

export interface ILineChartOptions {
  chartTitle: string;
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  transitionDuration: number;
  dotRadius: number;
  xAxisTitle: string;
  yAxisTitle: string;
  ticks: {
    x: number;
    y: number;
  };
  displayAxisLabels: boolean;
  labelTextWrapWidth: number;
  color: d3.ScaleOrdinal<string, string>;
}

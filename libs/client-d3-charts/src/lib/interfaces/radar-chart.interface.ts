import * as d3 from 'd3';

export interface IRadarChartDataNode {
  axis: string;
  value: number;
  unit: string;
}

export type TRadarChartData = IRadarChartDataNode[][];

export interface IRadarChartOptions {
  chartTitle: string;
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  maxValue: number;
  levels: number;
  lineFactor: number;
  labelFactor: number;
  labelTextWrapWidth: number;
  opacityArea: number;
  dotRadius: number;
  opacityCircles: number;
  strokeWidth: number;
  roundStrokes: boolean;
  transitionDuration: number;
  color: d3.ScaleOrdinal<string, string>;
}

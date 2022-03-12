import * as d3 from 'd3';

export interface IBarChartDataNode {
  title: string;
  value: number;
}

export type TBarChartData = IBarChartDataNode[];

export interface IBarChartOptions {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  xAxisPadding: number;
  xAxisTitle: string;
  yAxisTitle: string;
  labelTextWrapWidth: number;
  color: d3.ScaleOrdinal<string, string>;
}

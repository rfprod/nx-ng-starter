import type * as d3 from 'd3';

/** The radar chart data node. */
export interface IRadarChartDataNode {
  /** The radar chart axis name. */
  axis: string;
  /** The radar chart axis value. */
  value: number;
  /** The radar chart axis unit. */
  unit: string;
}

/** The radar chart data. */
export type TRadarChartData = IRadarChartDataNode[][];

/** The radar chart options. */
export interface IRadarChartOptions {
  /** The chart title. */
  chartTitle: string;
  /** The chart width. */
  width: number;
  /** The chart height. */
  height: number;
  /** The chart margins from the border of the container */
  margin: {
    /** The top margin. */
    top: number;
    /** The right margin. */
    right: number;
    /** The botton margin. */
    bottom: number;
    /** The left margin. */
    left: number;
  };
  maxValue: number;
  levels: number;
  lineFactor: number;
  labelFactor: number;
  opacityArea: number;
  /** The radius of the chart dots (vertexes). */
  dotRadius: number;
  opacityCircles: number;
  strokeWidth: number;
  roundStrokes: boolean;
  /** Transition duration configuration. Used mainly for the chart tooltips. */
  transitionDuration: number;
  /** The chart label text wrap width */
  labelTextWrapWidth: number;
  /** The color scale for the chart */
  color: d3.ScaleOrdinal<string, string>;
}

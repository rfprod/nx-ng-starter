import type * as d3 from 'd3';

/** The line chart data node. */
export interface ILineChartDataNode {
  /** The X axis value. */
  timestamp: number;
  /** The Y axis value. */
  value: number;
}

/** The line chart data. */
export type TLineChartData = ILineChartDataNode[];

/**
 * Date formats:
 * - default: `${dd}/${mm}/${yy} ${hour}:${minute}`
 * - 'dd/mm/yyyy': `${dd}/${mm}/${yyyy}`
 * - 'dd/mm/yy': `${dd}/${mm}/${yy}`
 * - 'mm/yyyy': `${mm}/${yyyy}`
 * - 'yyyy': `${yyyy}`
 */
export type TDateFormat = 'default' | 'dd/mm/yyyy' | 'dd/mm/yy' | 'mm/yyyy' | 'yyyy';

/** The line chart options. */
export interface ILineChartOptions {
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
    /** The bottom margin. */
    bottom: number;
    /** The left margin. */
    left: number;
  };
  /** Transition duration configuration. Used mainly for the chart tooltips. */
  transitionDuration: number;
  /** The radius of the chart dots (vertexes). */
  dotRadius: number;
  /** The title of the X axis. */
  xAxisTitle: string;
  /** The title of the Y axis. */
  yAxisTitle: string;
  /** Axes ticks. */
  ticks: {
    /** The X axis ticks. */
    x: number;
    /** The Y axis ticks. */
    y: number;
  };
  /** Whether to display axes labels. */
  displayAxisLabels: boolean;
  /** The date format for the X axis. */
  dateFormat: TDateFormat;
  /** The chart label text wrap width */
  labelTextWrapWidth: number;
  /** The color scale for the chart */
  color: d3.ScaleOrdinal<string, string>;
}

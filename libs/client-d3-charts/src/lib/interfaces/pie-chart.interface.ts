export interface IPieChartDataNode {
  key: string;
  y: number;
}

export interface IPieChartOptions {
  /** The chart title */
  chartTitle: string;
  /** The chart width for calculation of the outer radius */
  width: number;
  /** The chart height for calculation of the outer radius */
  height: number;
  /** The chart margins from the border of the container */
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  /** The inner radius of the chart */
  innerRadius: number;
  /** The chart label offset relative to the outer border */
  labelRadiusModifier: number;
  /** The chart label text wrap width */
  labelTextWrapWidth: number;
  /** Whether to show labels next to the chart slices */
  showLabels: boolean;
  /** Transition duration configuration. Used mainly for the chart tooltips. */
  transitionDuration: number;
  /** The color scale for the chart */
  color: d3.ScaleOrdinal<string, string>;
}

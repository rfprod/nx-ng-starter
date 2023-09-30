export interface IGaugeChartDataNode {
  key: string;
  y: number;
}

export interface IGaugeChartOptions {
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
  /** Whether to show tooltips on chunk hover below the chart */
  showTooltips: boolean;
  /** Transition duration configuration. Used mainly for the chart tooltips. */
  transitionDuration: number;
  /** The color for the filled chunks */
  color: string;
  /** The color for the empty chunks */
  defaultColor: string;
  /** The value of the gauge chart */
  value: number;
}

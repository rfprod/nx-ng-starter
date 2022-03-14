export interface IPieChartDataNode {
  key: string;
  y: number;
}

export enum PIE_CHART_ARC_CONFIG {
  ARC_INNER_RADIUS = 50,
  LABEL_INNER_RADIUS = 40,
}

export interface IPieChartOptions {
  chartTitle: string;
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  labelTextWrapWidth: number;
  color: d3.ScaleOrdinal<string, string>;
}

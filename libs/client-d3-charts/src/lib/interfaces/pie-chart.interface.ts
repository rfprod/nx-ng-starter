export interface IPieChartDataNode {
  key: string;
  y: number;
}

export enum PIE_CHART_ARC_CONFIG {
  ARC_OUTER_RADIUS = 10,
  ARC_INNER_RADIUS = 50,
  LABEL_OUTER_RADIUS = 40,
  LABEL_INNER_RADIUS = 40,
}

export interface IPieChartOptions {
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

export interface IPieChartDataNode {
  key: string;
  y: number;
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
  innerRadius: number;
  labelRadiusModifier: number;
  labelTextWrapWidth: number;
  color: d3.ScaleOrdinal<string, string>;
}

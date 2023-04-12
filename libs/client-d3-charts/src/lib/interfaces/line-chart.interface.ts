import * as d3 from 'd3';

export interface ILineChartDataNode {
  timestamp: number;
  value: number;
}

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
  dateFormat: TDateFormat;
  labelTextWrapWidth: number;
  color: d3.ScaleOrdinal<string, string>;
}

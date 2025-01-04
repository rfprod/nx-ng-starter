import type * as d3 from 'd3';

/** Force directed chart graph domain. */
export interface IForceDirectedGraphDomain {
  /** The index of the domain. */
  index: number;
  /** The name of the domain. */
  name: string;
  /** The value/weight of the domain. */
  value: number;
}

/** Force directed chart graph entity. */
export interface IForceDirectedGraphEntity {
  /** The index of the entity. */
  index: number;
  /** The name of the entity. */
  name: string;
  /** Domains the entity belongs to. */
  domains: string[];
  /** The image of the entity. */
  img: string;
  /** The counter of links to other entities. */
  linksCount: number;
}

/** Force directed chart data node. */
export interface IForceDirectedChartDataNode extends d3.SimulationNodeDatum {
  /** The index of the data node. */
  index: number;
  /** Domains the data node belongs to. */
  domains?: string[];
  /** The value/weight of the node. */
  value?: number;
  /** The name of the node. */
  name?: string;
  /** The image of the node. */
  img?: string;
  /** The counter of links to other entities. */
  linksCount?: number;
}

/** Force directed chart data. */
export interface IForceDirectedChartData {
  domains: IForceDirectedGraphDomain[];
  entities: IForceDirectedGraphEntity[];
  links: Array<d3.SimulationLinkDatum<IForceDirectedChartDataNode>>;
  nodes: IForceDirectedChartDataNode[];
}

/** Force directed chart options. */
export interface IForceDirectedChartOptions {
  /** The title of the chart. */
  chartTitle: string;
  /** The width of the chart. */
  width: number;
  /** The height of the chart. */
  height: number;
  /** The modifier for calculatin position of the center of the chart. */
  centerCalcMod: number;
  /** Configuration of the forces. */
  charge: {
    strength: number;
    theta: number;
    distanceMax: number;
  };
  distance: number;
  fontSize: number;
  collisionRadius: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  linkStrokeColor: string;
  linkStrokeWidth: number;
  labelTextWrapWidth: number;
  color: d3.ScaleOrdinal<string, string>;
  nodeColor: string;
  nodeStrokeColor: string;
  nodeStrokeWidth: number;
}

/**
 * Contribution size threshold config.
 */
export interface IThresholdsConfig {
  maxFiles: number;
  insertions: number;
  deletions: number;
}

export interface IActorConfig {
  actor: string;
  thresholds: IThresholdsConfig;
}

import type { IActorConfig, IThresholdsConfig } from './contribution-size.interface';

/**
 * Actors configuration.
 */
export const actors: readonly IActorConfig[] = Object.freeze([
  {
    actor: 'rfprod',
    thresholds: {
      maxFiles: Number(Infinity),
      deletions: Number(Infinity),
      insertions: Number(Infinity),
    } as IThresholdsConfig,
  },
]);

/**
 * Default thresholds configuration.
 */
export const defaultThresholds: IThresholdsConfig = {
  maxFiles: 10,
  deletions: 150,
  insertions: 150,
};

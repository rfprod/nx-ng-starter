import { IActorConfig, IThresholdsConfig } from './contribution-size.interface';

/**
 * Actors configuration.
 */
export const actors: Readonly<IActorConfig[]> = Object.freeze([
  {
    actor: 'rfprod',
    thresholds: <IThresholdsConfig>{
      maxFiles: Number(Infinity),
      deletions: Number(Infinity),
      insertions: Number(Infinity),
    },
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

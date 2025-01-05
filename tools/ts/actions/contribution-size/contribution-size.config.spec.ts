import { actors, defaultThresholds } from './contribution-size.config';
import type { IActorConfig, IThresholdsConfig } from './contribution-size.interface';

describe('contribution-size.config', () => {
  it('actors should have expected value', () => {
    const expectation: readonly IActorConfig[] = Object.freeze([
      {
        actor: 'rfprod',
        thresholds: {
          maxFiles: Number(Infinity),
          deletions: Number(Infinity),
          insertions: Number(Infinity),
        } as IThresholdsConfig,
      },
    ]);
    expect(actors).toEqual(expectation);
  });

  it('defaultThresholds should have expected value', () => {
    const expectation: Readonly<IThresholdsConfig> = Object.freeze({
      maxFiles: 10,
      deletions: 150,
      insertions: 150,
    });
    expect(defaultThresholds).toEqual(expectation);
  });
});

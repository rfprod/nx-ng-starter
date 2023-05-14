import { actors, defaultThresholds } from './contribution-size.config';
import { IActorConfig, IThresholdsConfig } from './contribution-size.interface';

describe('contribution-size.config', () => {
  it('actors should have expected value', () => {
    const expectation: Readonly<IActorConfig[]> = Object.freeze([
      {
        actor: 'rfprod',
        thresholds: <IThresholdsConfig>{
          maxFiles: Number(Infinity),
          deletions: Number(Infinity),
          insertions: Number(Infinity),
        },
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

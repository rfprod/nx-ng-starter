import { defaultForceDirectedChartConfig } from './force-directed-chart.util';

describe('force-directed-chart.util', () => {
  it('defaultForceDirectedChartConfig should match object', () => {
    expect(defaultForceDirectedChartConfig).toMatchObject({
      chartTitle: expect.any(String),
      width: expect.any(Number),
      height: expect.any(Number),
      centerCalcMod: expect.any(Number),
      charge: {
        strength: expect.any(Number),
        theta: expect.any(Number),
        distanceMax: expect.any(Number),
      },
      distance: expect.any(Number),
      fontSize: expect.any(Number),
      collisionRadius: expect.any(Number),
      margin: {
        top: expect.any(Number),
        right: expect.any(Number),
        bottom: expect.any(Number),
        left: expect.any(Number),
      },
      strokeWidth: expect.any(Number),
      labelTextWrapWidth: expect.any(Number),
      color: expect.any(Function),
    });
  });
});

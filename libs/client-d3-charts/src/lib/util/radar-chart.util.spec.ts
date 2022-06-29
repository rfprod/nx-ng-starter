import { defaultRadarChartConfig } from './radar-chart.util';

describe('radar-chart.util', () => {
  it('defaultRadarChartConfig should match object', () => {
    expect(defaultRadarChartConfig).toMatchObject({
      chartTitle: expect.any(String),
      width: expect.any(Number),
      height: expect.any(Number),
      margin: {
        top: expect.any(Number),
        right: expect.any(Number),
        bottom: expect.any(Number),
        left: expect.any(Number),
      },
      levels: expect.any(Number),
      maxValue: expect.any(Number),
      lineFactor: expect.any(Number),
      labelFactor: expect.any(Number),
      labelTextWrapWidth: expect.any(Number),
      opacityArea: expect.any(Number),
      dotRadius: expect.any(Number),
      opacityCircles: expect.any(Number),
      strokeWidth: expect.any(Number),
      roundStrokes: expect.any(Boolean),
      transitionDuration: expect.any(Number),
      color: expect.any(Function),
    });
  });
});

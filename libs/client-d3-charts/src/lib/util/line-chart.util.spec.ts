import { defaultLineChartConfig } from './line-chart.util';

describe('line-chart.util', () => {
  it('defaultLineChartConfig should match object', () => {
    expect(defaultLineChartConfig).toMatchObject({
      chartTitle: expect.any(String),
      width: expect.any(Number),
      height: expect.any(Number),
      margin: {
        top: expect.any(Number),
        right: expect.any(Number),
        bottom: expect.any(Number),
        left: expect.any(Number),
      },
      transitionDuration: expect.any(Number),
      dotRadius: expect.any(Number),
      xAxisTitle: expect.any(String),
      yAxisTitle: expect.any(String),
      ticks: {
        x: expect.any(Number),
        y: expect.any(Number),
      },
      displayAxisLabels: expect.any(Boolean),
      labelTextWrapWidth: expect.any(Number),
      color: expect.any(Function),
    });
  });
});

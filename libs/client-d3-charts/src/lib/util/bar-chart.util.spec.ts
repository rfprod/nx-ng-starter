import { defaultBarChartConfig, drawBarChart } from './bar-chart.util';

describe('bar-chart.util', () => {
  it('should export the configuration object', () => {
    expect(defaultBarChartConfig).toMatchObject({
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
      xAxisPadding: expect.any(Number),
      xAxisTitle: expect.any(String),
      yAxisTitle: expect.any(String),
      yAxisTicks: expect.any(Number),
      displayAxisLabels: expect.any(Boolean),
      labelTextWrapWidth: expect.any(Number),
      color: expect.any(Function),
    });
  });

  it('should export the constructor function', () => {
    expect(typeof drawBarChart === 'function').toBeTruthy();
  });
});

import { defaultPieChartConfig, drawPieChart } from './pie-chart.util';

describe('pie-chart.util', () => {
  it('should export the configuration object', () => {
    expect(defaultPieChartConfig).toMatchObject({
      chartTitle: expect.any(String),
      width: expect.any(Number),
      height: expect.any(Number),
      margin: {
        top: expect.any(Number),
        right: expect.any(Number),
        bottom: expect.any(Number),
        left: expect.any(Number),
      },
      innerRadius: expect.any(Number),
      labelRadiusModifier: expect.any(Number),
      labelTextWrapWidth: expect.any(Number),
      transitionDuration: expect.any(Number),
      color: expect.any(Function),
    });
  });

  it('should export the constructor function', () => {
    expect(typeof drawPieChart === 'function').toBeTruthy();
  });
});

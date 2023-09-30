import { defaultGaugeChartConfig } from './gauge-chart.util';

describe('gauge-chart.util', () => {
  it('defaultGaugeChartConfig should match object', () => {
    expect(defaultGaugeChartConfig).toMatchObject({
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
      showLabels: expect.any(Boolean),
      showTooltips: expect.any(Boolean),
      labelRadiusModifier: expect.any(Number),
      labelTextWrapWidth: expect.any(Number),
      transitionDuration: expect.any(Number),
      color: 'green',
      defaultColor: 'lightgray',
      value: expect.any(Number),
    });
  });
});

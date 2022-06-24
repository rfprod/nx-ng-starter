import { defaultPieChartConfig } from './pie-chart.util';

describe('pie-chart.util', () => {
  it('defaultPieChartConfig should match object', () => {
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
      color: expect.any(Function),
    });
  });
});

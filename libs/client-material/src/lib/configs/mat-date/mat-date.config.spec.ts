import { CUSTOM_DATE_FORMATS, matMomentDateAdapterOptionsFactory } from './mat-date.config';

describe('mat-date config', () => {
  it('matMomentDateAdapterOptionsFactory should return expected options', () => {
    const options = matMomentDateAdapterOptionsFactory();
    const expected = {
      useUtc: false,
    };
    expect(options).toMatchObject(expected);
  });

  it('CUSTOM_DATE_FORMATS should have expected value', () => {
    const formats = { ...CUSTOM_DATE_FORMATS };
    const expected = {
      parse: {
        dateInput: 'DD.MM.YYYY',
      },
      display: {
        dateInput: 'DD.MM.YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
      },
    };
    expect(formats).toMatchObject(expected);
  });
});

import { MatDateFormats } from '@angular/material/core';
import { MatMomentDateAdapterOptions } from '@angular/material-moment-adapter';

/**
 * Material moment date adapter options factory.
 */
export function matMomentDateAdapterOptionsFactory(): MatMomentDateAdapterOptions {
  return {
    useUtc: false,
  };
}

export const CUSTOM_DATE_FORMATS: MatDateFormats = {
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

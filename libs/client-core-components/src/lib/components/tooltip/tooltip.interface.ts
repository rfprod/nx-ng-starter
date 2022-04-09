import { InjectionToken, Provider } from '@angular/core';

export interface ITooltipData {
  text: string;
}

export const TOOLTIP_DATA = new InjectionToken<ITooltipData>('TOOLTIP_DATA');

export const tooltipDataProvider: Provider = {
  provide: TOOLTIP_DATA,
  useValue: {
    text: '',
  },
};

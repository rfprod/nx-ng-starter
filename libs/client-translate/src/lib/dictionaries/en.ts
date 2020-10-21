import { InjectionToken } from '@angular/core';

import { IUiDictionary } from '../interfaces/ui-dictionary.interface';

export const EN_DICTIONARY = new InjectionToken<IUiDictionary>('EN');

/**
 * Translate service shared dictionary: ENssian.
 */
export const EN: IUiDictionary = {
  shared: {
    title: 'NX NG Starter',
  },
};

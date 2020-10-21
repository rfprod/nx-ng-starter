import { InjectionToken } from '@angular/core';

import { IUiDictionary } from '../interfaces/ui-dictionary.interface';

export const RU_DICTIONARY = new InjectionToken<IUiDictionary>('RU');

/**
 * Translate service shared dictionary: Russian.
 */
export const RU: IUiDictionary = {
  shared: {
    title: 'NX NG Starter',
  },
};

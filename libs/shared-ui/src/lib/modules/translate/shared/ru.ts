import { InjectionToken } from '@angular/core';

export const RU_DICTIONARY = new InjectionToken<IUiDictionary>('RU');

export interface IUiDictionary {
  shared: {
    title: string;
  };
}

/**
 * Translate service shared dictionary: Russian.
 */
export const RU: IUiDictionary = {
  shared: {
    title: 'NX NG Starter',
  },
};

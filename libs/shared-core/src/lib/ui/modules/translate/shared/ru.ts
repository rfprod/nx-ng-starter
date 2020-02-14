import { InjectionToken } from '@angular/core';

export const RU_DICTIONARY = new InjectionToken<'RU'>('RU');

export interface ISharedDictionary {
  shared: {
    title: string;
  };
}

/**
 * Translate service shared dictionary: Russian.
 */
export const RU: ISharedDictionary = {
  shared: {
    title: 'NX NG Starter',
  },
};

import { InjectionToken, Provider } from '@angular/core';

import { IElizaData } from '../interfaces/eliza.interface';
import { elizaFinals } from './finals.config';
import { elizaInitials } from './initials.config';
import { elizaKeywords } from './keywords.config';
import { elizaPostTransforms } from './post-transforms.config';
import { elizaPosts } from './posts.config';
import { elizaPres } from './pres.config';
import { elizaQuits } from './quits.config';
import { elizaSynonyms } from './synonyms.config';

/**
 * Eliza data configuration.
 */
export const elizaData: IElizaData = {
  initials: elizaInitials,
  finals: elizaFinals,
  quits: elizaQuits,
  pres: elizaPres,
  posts: elizaPosts,
  synonyms: elizaSynonyms,
  keywords: elizaKeywords,
  postTransforms: elizaPostTransforms,
};

/**
 * Eliza data injection token.
 */
export const ELIZA_DATA = new InjectionToken<IElizaData>('ELIZA_DATA');

/**
 * Eliza data provider constructor.
 * @param data Eliza data
 * @returns Eliza data provider
 */
export const elizaDataProvider = (data: IElizaData): Provider =>
  <Provider>{
    provide: ELIZA_DATA,
    providedIn: 'root',
    useValue: { ...data },
  };

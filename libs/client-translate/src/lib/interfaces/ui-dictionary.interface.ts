import { type TranslationObject } from '@ngx-translate/core';

/**
 * UI dictionary interface.
 */
export interface IUiDictionary extends TranslationObject {
  shared?: { [key: string]: string };
}

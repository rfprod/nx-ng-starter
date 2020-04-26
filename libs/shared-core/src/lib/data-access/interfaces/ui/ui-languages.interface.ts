/**
 * UI languages interface.
 */
export interface IUiLanguagesInterface {
  /**
   * Code for Russian language.
   */
  ru: 'ru';
  /**
   * Code for English language.
   */
  en: 'en';
}

/**
 * Laguage codes type.
 */
export type ILangCode = 'ru' | 'en';

/**
 * Laguage codes type.
 */
export type ILangName = 'Russian' | 'English' | 'Русский' | 'Английский';

/**
 * Supported languages interface.
 */
export interface ISupportedLanguage {
  /**
   * Language code.
   */
  key: ILangCode;
  /**
   * Language name.
   */
  name: ILangName;
}

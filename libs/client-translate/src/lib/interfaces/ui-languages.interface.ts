/**
 * UI languages interface.
 */
export interface IUiLanguagesInterface {
  ru: 'ru';
  en: 'en';
}

/**
 * Laguage codes type.
 */
export type TLangCode = 'ru' | 'en';

/**
 * Laguage codes type.
 */
export type TLangName = 'Russian' | 'English' | 'Русский' | 'Английский';

/**
 * Supported languages interface.
 */
export interface ISupportedLanguage {
  key: TLangCode;
  name: TLangName;
}

export enum LANG_CODE {
  RU = 'ru',
  EN = 'en',
}

/**
 * UI languages interface.
 */
export interface IUiLanguagesInterface {
  ru: LANG_CODE.RU;
  en: LANG_CODE.EN;
}

export const uiLanguages: IUiLanguagesInterface = {
  ru: LANG_CODE.RU,
  en: LANG_CODE.EN,
};

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

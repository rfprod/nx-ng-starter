import { Inject, Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { WINDOW } from '@app/client-util';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

import { EN_DICTIONARY } from '../dictionaries/en';
import { RU_DICTIONARY } from '../dictionaries/ru';
import { IUiDictionary } from '../interfaces/ui-dictionary.interface';
import { ISupportedLanguage, IUiLanguagesInterface, TLangCode, uiLanguages } from '../interfaces/ui-languages.interface';
import { IUiTranslations } from '../interfaces/ui-translations.interface';

/**
 * Application translation utils service.
 */
@Injectable({
  providedIn: 'root',
})
export class AppTranslationUtilsService {
  /**
   * Language changes notifier.
   */
  private readonly languageChangesSubject = new Subject<LangChangeEvent>();

  public readonly languageChanges$ = this.languageChangesSubject.asObservable();

  /**
   * Available UI language codes.
   */
  private readonly langs = { ...uiLanguages };

  /**
   * Supported UI languages.
   */
  private readonly supportedLangs: ISupportedLanguage[] = [
    { key: 'en', name: 'English' },
    { key: 'ru', name: 'Russian' },
  ];

  /**
   * UI dictionaries.
   */
  private readonly translations: IUiTranslations = {
    ru: { ...this.ruDictionary },
    en: { ...this.enDictionary },
  };

  constructor(
    private readonly translate: TranslateService,
    private readonly dateAdapter: DateAdapter<unknown>,
    @Inject(WINDOW) private readonly win: Window,
    @Inject(RU_DICTIONARY) private readonly ruDictionary: IUiDictionary,
    @Inject(EN_DICTIONARY) private readonly enDictionary: IUiDictionary,
  ) {
    this.languageChangeSubscription();
  }

  /**
   * Initializes Translate service.
   */
  public initialize(): void {
    this.setDatepickersLocale('ru');
    this.translate.setDefaultLang(this.langs.ru);
    this.translate.setTranslation(this.langs.ru, this.translations.ru);
    this.translate.setTranslation(this.langs.en, this.translations.en);
    void this.translate.use(this.langs.ru);
  }

  /**
   * Sets UI language, depending on preferences in user browser.
   * For now there are only dictionaries only: English, Russian
   * Russian language is set is user preference does not include one of the supported languages.
   */
  public getUserLanguagePreference(): TLangCode {
    const navLang: string = this.win.navigator.language;
    const userPreference: TLangCode = Boolean(navLang.match(/(ru-RU|ru)/gi)) || Boolean(navLang[0].match(/(ru)/gi)) ? 'ru' : 'en';
    return userPreference;
  }

  /**
   * Available UI language codes.
   */
  public languages(): IUiLanguagesInterface {
    return this.langs;
  }

  /**
   * Supported UI languages.
   */
  public supportedLanguages(): ISupportedLanguage[] {
    return this.supportedLangs;
  }

  /**
   * UI dictionaries.
   */
  public dictionaries(): IUiTranslations {
    return this.translations;
  }

  /**
   * Uses specific language for UI.
   * @param langCode language code
   */
  public useLanguage(langCode: TLangCode): void {
    if (langCode in this.langs) {
      void this.translate.use(this.langs[langCode]);
    }
  }

  /**
   * Resolves if language is current based on provided language code
   * @param langCode language code
   */
  public isCurrentLanguage(langCode: TLangCode): boolean {
    return this.translate.currentLang === langCode;
  }

  /**
   * Translate service language change subscription.
   */
  private languageChangeSubscription(): void {
    void this.translate.onLangChange.subscribe((langChangeEvent: LangChangeEvent) => {
      this.languageChangesSubject.next(langChangeEvent);
      const langCode: TLangCode = langChangeEvent.lang as TLangCode;
      this.setDatepickersLocale(langCode);
    });
  }

  /**
   * Sets datapickers locale:
   * 'ru' if key corresponds Russian language, 'en' in all other cases.
   * @param key language key to be seleted, supported languages: en, ru
   */
  private setDatepickersLocale(key: TLangCode): void {
    this.dateAdapter.setLocale(key);
  }
}

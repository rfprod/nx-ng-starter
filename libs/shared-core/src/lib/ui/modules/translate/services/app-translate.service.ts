import { Injectable, Inject } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { DateAdapter } from '@angular/material';

import { RU as SHARED_RU } from '../shared/ru';

import {
  IUiLanguagesInterface,
  IUiTranslations,
  ILangCode,
  ISupportedLanguage
} from '@nx-ng-starter/shared-core/data-access';

import { Subject } from 'rxjs';

/**
 * Application translation utils service.
 */
@Injectable()
export class AppTranslationUtilsService {

  /**
   * AppTranslationUtilsService constructor.
   * @param translate Translate service
   * @param dateAdapter Datepickers date adapter
   * @param window Window reference
   */
  constructor(
    private translate: TranslateService,
    private dateAdapter: DateAdapter<any>,
    @Inject('Window') private window: Window
  ) {
    this.languageChangeSubscription();
  }

  /**
   * Translate service language change subscription.
   */
  private languageChangeSubscription(): void {
    this.translate.onLangChange
      .subscribe(
        (langChangeEvent: any) => {
          console.log('AppTranslationUtilsService, onLangChange, langChangeEvent', langChangeEvent)
          this.languageChanges.next(langChangeEvent);
          this.setDatepickersLocale(langChangeEvent.lang);
        }
      );
  }

  /**
   * Language changes notifier.
   */
  public languageChanges = new Subject();

  /**
   * Initializes Translate service.
   */
  public initialize(): void {
    this.setDatepickersLocale('ru');
    this.translate.setDefaultLang(this.langs.ru);
    this.translate.setTranslation(this.langs.ru, this.translations.ru);
    this.translate.setTranslation(this.langs.en, this.translations.en);
    this.translate.use(this.langs.ru);
  }

  /**
   * Sets UI language, depending on preferences in user browser.
   * For now there are only dictionaries only: English, Russian
   * Russian language is set is user preference does not include one of the supported languages.
   */
  public getUserLanguagePreference(): ILangCode {
    const navLang: string = this.window.navigator.language;
    const userPreference: ILangCode = (navLang.match(/(ru-RU|ru)/ig) || navLang[0].match(/(ru)/ig)) ? 'ru' : 'en';
    return userPreference;
  }

  /**
   * Available UI language codes.
   */
  private langs: IUiLanguagesInterface = {
    ru: 'ru',
    en: 'en'
  };

  /**
   * Available UI language codes.
   */
  public languages(): IUiLanguagesInterface {
    return this.langs;
  }

  /**
   * Supported UI languages.
   */
  private supportedLangs: ISupportedLanguage[] = [
    { key: 'en', name: 'English' },
    { key: 'ru', name: 'Russian' }
  ];

  /**
   * Supported UI languages.
   */
  public supportedLanguages(): ISupportedLanguage[] {
    return this.supportedLangs;
  }

  /**
   * UI dictionaries.
   */
  private translations: IUiTranslations = {
    ru: Object.assign({}, SHARED_RU),
    en: Object.assign({}/*, SHARED_EN*/)
  };

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
  public useLanguage(langCode: ILangCode): void {
    console.log('translate service, useLanguage, langCode', langCode);
    if (langCode in this.langs) {
      this.translate.use(this.langs[langCode]);
    }
  };

  /**
   * Resolves if language is current based on provided language code
   * @param langCode language code
   */
  public isCurrentLanguage(langCode: ILangCode): boolean {
    return this.translate.currentLang === langCode;
  }

  /**
   * Sets datapickers locale:
   * 'ru' if key corresponds Russian language, 'en' in all other cases.
   * @param key language key to be seleted, supported languages: en, ru
   */
  private setDatepickersLocale(key: ILangCode): void {
    console.log('language change, key', key);
    console.log('this.dateAdapter', this.dateAdapter);
    this.dateAdapter.setLocale(key);
  }

}

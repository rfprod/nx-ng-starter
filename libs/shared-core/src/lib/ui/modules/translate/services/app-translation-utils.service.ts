import { Inject, Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import {
  ILangCode,
  ISupportedLanguage,
  IUiLanguagesInterface,
  IUiTranslations,
} from '@nx-ng-starter/shared-core/data-access';
import { Subject } from 'rxjs';
import { RU as SHARED_RU } from '../shared/ru';

/**
 * Application translation utils service.
 */
@Injectable()
export class AppTranslationUtilsService {
  /**
   * Language changes notifier.
   */
  public languageChanges: Subject<LangChangeEvent> = new Subject<LangChangeEvent>();

  /**
   * Available UI language codes.
   */
  private readonly langs: IUiLanguagesInterface = {
    ru: 'ru',
    en: 'en',
  };

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
    ru: { ...SHARED_RU },
    en: {
      /*, SHARED_EN*/
    },
  };

  /**
   * AppTranslationUtilsService constructor.
   * @param translate Translate service
   * @param dateAdapter Datepickers date adapter
   * @param window Window reference
   */
  constructor(
    private readonly translate: TranslateService,
    private readonly dateAdapter: DateAdapter<any>,
    @Inject('Window') private readonly window: Window,
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
    this.translate.use(this.langs.ru);
  }

  /**
   * Sets UI language, depending on preferences in user browser.
   * For now there are only dictionaries only: English, Russian
   * Russian language is set is user preference does not include one of the supported languages.
   */
  public getUserLanguagePreference(): ILangCode {
    const navLang: string = this.window.navigator.language;
    const userPreference: ILangCode =
      navLang.match(/(ru-RU|ru)/gi) || navLang[0].match(/(ru)/gi) ? 'ru' : 'en';
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
  public useLanguage(langCode: ILangCode): void {
    if (langCode in this.langs) {
      this.translate.use(this.langs[langCode]);
    }
  }
  /**
   * Resolves if language is current based on provided language code
   * @param langCode language code
   */
  public isCurrentLanguage(langCode: ILangCode): boolean {
    return this.translate.currentLang === langCode;
  }

  /**
   * Translate service language change subscription.
   */
  private languageChangeSubscription(): void {
    this.translate.onLangChange.subscribe((langChangeEvent: LangChangeEvent) => {
      this.languageChanges.next(langChangeEvent);
      const langCode: ILangCode = langChangeEvent.lang as ILangCode;
      this.setDatepickersLocale(langCode);
    });
  }

  /**
   * Sets datapickers locale:
   * 'ru' if key corresponds Russian language, 'en' in all other cases.
   * @param key language key to be seleted, supported languages: en, ru
   */
  private setDatepickersLocale(key: ILangCode): void {
    this.dateAdapter.setLocale(key);
  }
}

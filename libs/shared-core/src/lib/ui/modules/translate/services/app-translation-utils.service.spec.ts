import { TestBed, TestModuleMetadata, async } from '@angular/core/testing';
import { DateAdapter } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { getTestBedConfig, newTestBedMetadata } from '@nx-ng-starter/mocks-core';
import { Subject } from 'rxjs';
import {
  ILangCode,
  ISupportedLanguage,
  IUiLanguagesInterface,
} from '../../../../data-access/index';
import { CustomMaterialModule } from '../../custom-material/custom-material.module';
import { AppTranslateModule } from '../app-translate.module';
import { AppTranslationUtilsService } from './app-translation-utils.service';

describe('AppTranslationUtilsService', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [
      CustomMaterialModule.forRoot(),
      AppTranslateModule.forRoot(),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let service: AppTranslationUtilsService;
  let translate: TranslateService;
  let dateAdapter: DateAdapter<any>;
  let win: Window;
  let spy: {
    service: {
      languageChanges: jest.SpyInstance
    },
    translate: {
      onLangChange: jest.SpyInstance,
      setDefaultLang: jest.SpyInstance,
      setTranslation: jest.SpyInstance,
      use: jest.SpyInstance,
    },
    dateAdapter: {
      setLocale: jest.SpyInstance,
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        service = TestBed.get(AppTranslationUtilsService) as AppTranslationUtilsService;
        translate = TestBed.get(TranslateService) as TranslateService;
        dateAdapter = TestBed.get(DateAdapter) as DateAdapter<any>;
        win = TestBed.get('Window') as Window;

        spy = {
          service: {
            languageChanges: jest.spyOn(service.languageChanges, 'next'),
          },
          translate: {
            onLangChange: jest.spyOn(translate.onLangChange, 'subscribe'),
            setDefaultLang: jest.spyOn(translate, 'setDefaultLang'),
            setTranslation: jest.spyOn(translate, 'setTranslation'),
            use: jest.spyOn(translate, 'use'),
          },
          dateAdapter: {
            setLocale: jest.spyOn(dateAdapter, 'setLocale'),
          },
        };
      });
  }));

  it('should exist and have variables and methods defined', () => {
    expect(service).toBeDefined();
    expect(service['languageChangeSubscription']).toEqual(jasmine.any(Function));
    expect(service.languageChanges).toEqual(jasmine.any(Subject));
    expect(service.initialize).toEqual(jasmine.any(Function));
    expect(service.getUserLanguagePreference).toEqual(jasmine.any(Function));
    const langs: IUiLanguagesInterface = {
      ru: 'ru',
      en: 'en',
    };
    expect(service['langs']).toEqual(jasmine.objectContaining(langs));
    expect(service.languages).toEqual(jasmine.any(Function));
    const supportedLangs: ISupportedLanguage[] = [
      { key: 'en', name: 'English' },
      { key: 'ru', name: 'Russian' },
    ];
    expect(service['supportedLangs']).toEqual(supportedLangs);
    expect(service.supportedLanguages).toEqual(jasmine.any(Function));
    expect(service['translations']).toEqual(
      jasmine.objectContaining({
        ru: jasmine.any(Object),
        en: jasmine.any(Object),
      }),
    );
    expect(service.dictionaries).toEqual(jasmine.any(Function));
    expect(service.useLanguage).toEqual(jasmine.any(Function));
    expect(service.isCurrentLanguage).toEqual(jasmine.any(Function));
    expect(service['setDatepickersLocale']).toEqual(jasmine.any(Function));
  });

  it('languageChangeSubscription should work correctly', async(() => {
    service['languageChangeSubscription']();
    expect(translate.onLangChange.subscribe).toHaveBeenCalled();
    translate.onLangChange.subscribe((langChangeEvent: any) => {
      expect(service.languageChanges.next).toHaveBeenCalledWith(langChangeEvent);
      expect(dateAdapter.setLocale).toHaveBeenCalledWith(langChangeEvent.lang);
    });
  }));

  it('initialize should work correctly', () => {
    const callsBefore = {
      dateAdapter: {
        setLocale: spy.dateAdapter.setLocale.mock.calls.length,
      },
      translate: {
        setDefaultLang: spy.translate.setDefaultLang.mock.calls.length,
        setTranslation: spy.translate.setTranslation.mock.calls.length,
        use: spy.translate.use.mock.calls.length,
      },
    };
    service.initialize();
    const callsAfter = {
      dateAdapter: {
        setLocale: spy.dateAdapter.setLocale.mock.calls.length,
      },
      translate: {
        setDefaultLang: spy.translate.setDefaultLang.mock.calls.length,
        setTranslation: spy.translate.setTranslation.mock.calls.length,
        use: spy.translate.use.mock.calls.length,
      },
    };
    expect(dateAdapter.setLocale).toHaveBeenCalledWith('ru');
    expect(translate.setDefaultLang).toHaveBeenCalled();
    expect(translate.setTranslation).toHaveBeenCalled();
    expect(translate.use).toHaveBeenCalled();
    expect(callsAfter.dateAdapter.setLocale - callsBefore.dateAdapter.setLocale).toEqual(1);
    expect(callsAfter.translate.setDefaultLang - callsBefore.translate.setDefaultLang).toEqual(1);
    expect(callsAfter.translate.setTranslation - callsBefore.translate.setTranslation).toEqual(
      1 + 1,
    );
    expect(callsAfter.translate.use - callsBefore.translate.use).toEqual(1);
  });

  it('getUserLanguagePreference should work correctly', () => {
    const navLang: string = win.navigator.language;
    const userPreference: ILangCode =
      navLang.match(/(ru-RU|ru)/gi) || navLang[0].match(/(ru)/gi) ? 'ru' : 'en';
    expect(service.getUserLanguagePreference()).toEqual(userPreference);
  });

  it('languages should return available UI language codes', () => {
    expect(service.languages()).toEqual(service['langs']);
  });

  it('supportedLanguages should return supported UI languages', () => {
    expect(service.supportedLanguages()).toEqual(service['supportedLangs']);
  });

  it('dictionaries should return UI dictionaries', () => {
    expect(service.dictionaries()).toEqual(service['translations']);
  });

  it('useLanguage should call translate.use if language is supported which is deternmined by language code', () => {
    const callsBefore = {
      translate: {
        use: spy.translate.use.mock.calls.length,
      },
    };
    service.useLanguage(null);
    const callsAfter = {
      translate: {
        use: spy.translate.use.mock.calls.length,
      },
    };
    expect(callsAfter.translate.use - callsBefore.translate.use).toEqual(0);

    service.useLanguage('ru');
    callsAfter.translate.use = spy.translate.use.mock.calls.length;
    expect(callsAfter.translate.use - callsBefore.translate.use).toEqual(1);

    service.useLanguage('en');
    callsAfter.translate.use = spy.translate.use.mock.calls.length;
    expect(callsAfter.translate.use - callsBefore.translate.use).toEqual(1 + 1);
  });

  it('isCurrentLanguage should resolve is language is current by its code', () => {
    const curLang: ILangCode = translate.currentLang as ILangCode;
    expect(service.isCurrentLanguage(null)).toBeFalsy();
    expect(service.isCurrentLanguage(curLang)).toBeTruthy();
  });
});

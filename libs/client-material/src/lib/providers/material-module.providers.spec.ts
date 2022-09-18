import { OverlayConfig } from '@angular/cdk/overlay';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY, MatMomentDateAdapterOptions } from '@angular/material-moment-adapter';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';

import { AppHammerGestureConfig } from '../configs/hammerjs-gesture/hammerjs-gesture.config';
import { CUSTOM_DATE_FORMATS, matMomentDateAdapterOptionsFactory } from '../configs/mat-date/mat-date.config';
import { appMaterialModuleProviders } from './material-module.providers';

describe('client-material-module-proviers', () => {
  const testBedConfig: TestModuleMetadata = {
    providers: [...appMaterialModuleProviders],
  };

  let matIconsRegistry: MatIconRegistry;
  let matDateLocale: string;
  let matMomentDateAdapter: MatMomentDateAdapterOptions;
  let matDateFormats: typeof CUSTOM_DATE_FORMATS;
  let hammerGestureConfig: HammerGestureConfig;
  let overlayConfig: OverlayConfig;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        matIconsRegistry = TestBed.inject(MatIconRegistry);
        matDateLocale = TestBed.inject(MAT_DATE_LOCALE) as string;
        matMomentDateAdapter = TestBed.inject(MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY);
        matDateFormats = TestBed.inject(MAT_DATE_FORMATS);
        hammerGestureConfig = TestBed.inject(HAMMER_GESTURE_CONFIG);
        overlayConfig = TestBed.inject(OverlayConfig);
      });
  }));

  it('appMaterialModuleProviders should provide expected providers', () => {
    expect(matIconsRegistry).toBeDefined();
    expect(matDateLocale).toEqual('en');
    expect(matMomentDateAdapter).toMatchObject(matMomentDateAdapterOptionsFactory());
    expect(matDateFormats).toMatchObject(CUSTOM_DATE_FORMATS);
    expect(hammerGestureConfig instanceof AppHammerGestureConfig).toBeTruthy();
    expect(overlayConfig).toMatchObject(
      new OverlayConfig({
        direction: 'ltr',
      }),
    );
  });
});

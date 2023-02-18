import { OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { InjectionToken, Provider } from '@angular/core';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY } from '@angular/material-moment-adapter';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { AppHammerGestureConfig } from '../configs/hammerjs-gesture/hammerjs-gesture.config';
import { CUSTOM_DATE_FORMATS, matMomentDateAdapterOptionsFactory } from '../configs/mat-date/mat-date.config';

/**
 * The overlay reference injection token.
 */
export const OVERLAY_REFERENCE = new InjectionToken<OverlayRef>('OverlayReference');

/**
 * Shared application material module providers.
 */
export const appMaterialModuleProviders: Provider[] = [
  MatIconRegistry,
  {
    provide: MAT_DATE_LOCALE,
    useValue: 'en',
  },
  {
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    useValue: <MatSnackBarConfig>{
      duration: 3000,
      politeness: 'polite',
    },
  },
  {
    provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY,
    useFactory: matMomentDateAdapterOptionsFactory,
  },
  { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  { provide: HAMMER_GESTURE_CONFIG, useClass: AppHammerGestureConfig },
  {
    provide: OverlayConfig,
    useFactory: () =>
      new OverlayConfig({
        direction: 'ltr',
      }),
  },
];

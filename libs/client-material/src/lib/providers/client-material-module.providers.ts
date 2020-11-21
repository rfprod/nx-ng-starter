import { OverlayConfig } from '@angular/cdk/overlay';
import { Provider } from '@angular/core';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY } from '@angular/material-moment-adapter';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { AppHammerGestureConfig } from '../configs/hammerjs-gesture.config';
import {
  CUSTOM_DATE_FORMATS,
  matMomentDateAdapterOptionsFactory,
} from '../configs/mat-date.config';
import { matTooltipOptionsFactory } from '../configs/mat-tooltip.config';

/**
 * Shared application material module providers.
 */
export const appClientMaterialModuleProviders: Provider[] = [
  MatIconRegistry,
  {
    provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
    useFactory: matTooltipOptionsFactory,
  },
  {
    provide: MAT_DATE_LOCALE,
    useValue: 'en',
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

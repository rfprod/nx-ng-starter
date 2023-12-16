import { OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { InjectionToken, Provider } from '@angular/core';

/** The overlay reference injection token. */
export const OVERLAY_REFERENCE = new InjectionToken<OverlayRef>('OverlayReference');

/** Overlay config provider. */
export const overlayProvider: Provider = {
  provide: OverlayConfig,
  useFactory: () =>
    new OverlayConfig({
      direction: 'ltr',
    }),
};

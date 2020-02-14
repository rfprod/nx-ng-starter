import { InjectionToken } from '@angular/core';

export type TWindowToken = InjectionToken<Window>;

/**
 * Application environment injection token.
 */
export const WINDOW: TWindowToken = new InjectionToken<Window>('Window');

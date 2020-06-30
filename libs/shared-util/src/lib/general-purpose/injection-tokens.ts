import { InjectionToken } from '@angular/core';

export type TWindowToken = InjectionToken<Window>;

export const WINDOW: TWindowToken = new InjectionToken<Window>('Window');

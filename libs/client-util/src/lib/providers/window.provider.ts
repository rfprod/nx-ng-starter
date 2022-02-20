import { InjectionToken, Provider } from '@angular/core';

export type TWindowToken = InjectionToken<Window>;

export const WINDOW: TWindowToken = new InjectionToken<Window>('WINDOW');

export function windowFactory() {
  return window;
}

export const windowProvider: Provider = {
  provide: WINDOW,
  useFactory: windowFactory,
};

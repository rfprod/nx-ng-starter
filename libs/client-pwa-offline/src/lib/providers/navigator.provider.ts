import { InjectionToken, type Provider } from '@angular/core';

export type TNavigatorToken = InjectionToken<Navigator>;

export const NAVIGATOR: TNavigatorToken = new InjectionToken<Navigator>('NAVIGATOR');

export function navigatorFactory() {
  return window.navigator;
}

export const navigatorProvider: Provider = {
  provide: NAVIGATOR,
  useFactory: navigatorFactory,
};

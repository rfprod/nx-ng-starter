import { InjectionToken } from '@angular/core';

import { IWebClientAppEnvironment } from '../interfaces';

export type TWindowToken = InjectionToken<Window>;

/**
 * Window injection token.
 */
export const WINDOW: TWindowToken = new InjectionToken<Window>('Window');

export type TWebClientEnvToken = InjectionToken<IWebClientAppEnvironment>;

/**
 * Web client environment injection token.
 */
export const WEB_CLIENT_APP_ENV: TWebClientEnvToken = new InjectionToken<IWebClientAppEnvironment>(
  'WEB_CLIENT_APP_ENV',
);

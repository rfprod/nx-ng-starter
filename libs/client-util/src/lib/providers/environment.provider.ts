import { InjectionToken, type Provider } from '@angular/core';

import type { IWebClientAppEnvironment } from '../interfaces';

export type TWebClientEnvToken = InjectionToken<IWebClientAppEnvironment>;

export const WEB_CLIENT_APP_ENV: TWebClientEnvToken = new InjectionToken<IWebClientAppEnvironment>('WEB_CLIENT_APP_ENV');

export const environmentProvider = (env: IWebClientAppEnvironment) =>
  ({
    provide: WEB_CLIENT_APP_ENV,
    useValue: { ...env },
  }) as Provider;

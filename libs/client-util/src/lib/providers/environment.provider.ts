import { InjectionToken, Provider } from '@angular/core';

import { IWebClientAppEnvironment } from '../interfaces';

export type TWebClientEnvToken = InjectionToken<IWebClientAppEnvironment>;

export const WEB_CLIENT_APP_ENV: TWebClientEnvToken = new InjectionToken<IWebClientAppEnvironment>('WEB_CLIENT_APP_ENV');

export const environmentProvider = (env: IWebClientAppEnvironment) =>
  <Provider>{
    provide: WEB_CLIENT_APP_ENV,
    useValue: { ...env },
  };

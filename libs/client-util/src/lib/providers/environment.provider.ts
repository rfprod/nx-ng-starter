import { InjectionToken } from '@angular/core';

import { IWebClientAppEnvironment } from '../interfaces';

export type TWebClientEnvToken = InjectionToken<IWebClientAppEnvironment>;

export const WEB_CLIENT_APP_ENV: TWebClientEnvToken = new InjectionToken<IWebClientAppEnvironment>('WEB_CLIENT_APP_ENV');

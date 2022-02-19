import { IWebClientAppEnvironment } from '@app/client-util';
import { Capacitor } from '@capacitor/core';

import { sentryEnvFactory } from './environment.config';

const platform: string = Capacitor.getPlatform();

/**
 * Production environment variables.
 */
export const environment: IWebClientAppEnvironment = {
  production: true,
  platform,
  appName: 'Nx Ng Starter Elements',
  description: 'Nx Ng Starter Elements: wigdets based on Angular Elements',
  api:
    platform !== 'web'
      ? 'https://nx-ng-starter.web.app/api'
      : window.location.origin.includes('localhost')
      ? 'http://localhost:8080/api'
      : `${window.location.origin}/api`,
  envoyUrl: 'http://localhost:8090',
  sentry: sentryEnvFactory({ production: true }),
};

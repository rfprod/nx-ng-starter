import { IWebClientAppEnvironment, TCapacitorPlatform } from '@app/client-util';
import { Capacitor } from '@capacitor/core';

import { appEnvFactory } from './environment.config';
import { sentryEnvFactory } from './sentry.config';

const platform: TCapacitorPlatform = Capacitor.getPlatform();

/**
 * Production environment variables.
 */
export const environment: IWebClientAppEnvironment = {
  production: true,
  platform,
  appName: 'Nx Ng Starter Client',
  description: 'The client application based on Angular.',
  api:
    platform !== 'web'
      ? 'https://nx-ng-starter.web.app/api'
      : window.location.origin.includes('localhost')
      ? 'http://localhost:8080/api'
      : `${window.location.origin}/api`,
  envoyUrl: 'http://localhost:8090',
  sentry: sentryEnvFactory({ production: true }),
  ...appEnvFactory(),
};

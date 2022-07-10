import { IWebClientAppEnvironment } from '@app/client-util';

import { appEnvFactory } from './environment.config';
import { sentryEnvFactory } from './sentry.config';

/**
 * Production environment variables.
 */
export const environment: IWebClientAppEnvironment = {
  production: true,
  platform: 'web',
  appName: 'Nx Ng Starter Elements',
  description: 'The custom web elements application based on Angular Elements.',
  api: window.location.origin.includes('localhost') ? 'http://localhost:8080/api' : `${window.location.origin}/api`,
  envoyUrl: 'http://localhost:8090',
  sentry: sentryEnvFactory({ production: true }),
  ...appEnvFactory(),
};

import { Capacitor } from '@capacitor/core';
import { IWebClientAppEnvironment } from '@nx-ng-starter/client-util';

const platform: string = Capacitor.getPlatform();

/**
 * Production environment variables.
 */
export const environment: IWebClientAppEnvironment = {
  production: true,
  platform,
  appName: 'Nx Ng Starter Elements',
  api:
    platform !== 'web'
      ? 'https://nx-ng-starter.web.app/api'
      : window.location.origin.includes('localhost')
      ? 'http://localhost:8080/api'
      : `${window.location.origin}/api`,
  envoyUrl: 'http://localhost:8082', // TODO
  sentryEnv: 'production',
};

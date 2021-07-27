import { IWebClientAppEnvironment } from '@app/client-util';
import { Capacitor } from '@capacitor/core';

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
  sentry: {
    env: 'production',
    dsn: 'https://3e5206aab4034899ab5abce655e35ff6@o551250.ingest.sentry.io/5674503',
    tracingOrigins: ['localhost:4200', 'https://nx-ng-starter-elements.web.app', 'https://nx-ng-starter-elements.firebaseapp.com'],
  },
};

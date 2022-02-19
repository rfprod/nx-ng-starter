import { IWebClientAppEnvironment } from '@app/client-util';

/**
 * Sentry environment configuration factory.
 */
export const sentryEnvFactory = (config: { production: boolean }): IWebClientAppEnvironment['sentry'] => ({
  env: config.production ? 'production' : 'development',
  dsn: 'https://3e5206aab4034899ab5abce655e35ff6@o551250.ingest.sentry.io/5674503',
  tracingOrigins: ['localhost:4200', 'https://nx-ng-starter.web.app', 'https://nx-ng-starter.firebaseapp.com'],
  tracesSampleRate: 1.0,
});

import { IWebClientAppEnvironment } from '@app/client-util';

/**
 * Sentry environment configuration factory.
 * @param config partial environment configuration
 * @returns sentry environment configuration
 */
export const sentryEnvFactory = (config: Pick<IWebClientAppEnvironment, 'production'>): IWebClientAppEnvironment['sentry'] => ({
  env: config.production ? 'production' : 'development',
  dsn: 'https://3e5206aab4034899ab5abce655e35ff6@o551250.ingest.sentry.io/5674503',
  tracingOrigins: ['https://nx-ng-starter-elements.web.app', 'https://nx-ng-starter-elements.firebaseapp.com'],
  tracesSampleRate: 1.0,
});

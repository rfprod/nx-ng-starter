import { TSentryEnvironment } from './sentry.interface';

/**
 * Application name type.
 */
export type TAppName = 'Nx Ng Starter' | string;

/**
 * Web Client Application environment.
 */
export interface IWebClientAppEnvironment {
  production: boolean;
  platform: string;
  appName: TAppName;
  description: string;
  api: string;
  envoyUrl: string;
  sentry: {
    env: TSentryEnvironment;
    dsn: string;
    tracingOrigins: string[];
    tracesSampleRate: number;
  };
}

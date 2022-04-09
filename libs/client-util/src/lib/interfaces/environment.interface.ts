import { TSentryEnvironment } from './sentry.interface';

/**
 * Application name type.
 */
export type TAppName = 'Nx Ng Starter' | string;

/**
 * Capacitor platform.
 */
export type TCapacitorPlatform = 'android' | 'ios' | 'web' | string;

/**
 * Web client application environment.
 */
export interface IWebClientAppEnvironment {
  production: boolean;
  platform: TCapacitorPlatform;
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
  meta: {
    version: string;
  };
}

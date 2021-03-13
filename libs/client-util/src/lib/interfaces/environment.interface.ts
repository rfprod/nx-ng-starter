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
  api: string;
  envoyUrl: string;
  sentryEnv: TSentryEnvironment;
}

/**
 * Application name type.
 */
export type TAppName = 'Nx Ng Starter' | string;

/**
 * Web Client Application environment.
 */
export interface IWebClientAppEnvironment {
  production: boolean;
  appName: TAppName;
  api: string;
  envoyUrl: string;
}

import { InjectionToken, Provider } from '@angular/core';

/**
 * Application environment constructor options interface.
 */
export interface IAppWebEnvironmentConstructorOptions {
  production?: boolean;
  appName?: string;
  api?: string;
  envoyUrl?: string;
}

/**
 * Application name type.
 */
export type TAppName = 'Nx Ng Starter' | string;

/**
 * Application environment.
 * By default generates dev environment.
 */
export class AppWebEnvironment {
  public production = false;

  public appName: TAppName = 'Nx Ng Starter';

  public api = '';

  public envoyUrl? = 'http://localhost:8081';

  /**
   * Constructor.
   * By default generates dev environment.
   * @param options app env constructor options
   */
  constructor(options: IAppWebEnvironmentConstructorOptions = {}) {
    if (typeof options.production !== 'undefined') {
      this.production = options.production;
    }
    if (typeof options.appName !== 'undefined') {
      this.appName = options.appName;
    }
    if (typeof options.api !== 'undefined') {
      this.api = options.api;
    }
    if (typeof options.envoyUrl !== 'undefined') {
      this.envoyUrl = options.envoyUrl;
    }
  }
}

/**
 * Application environment injection token.
 */
export type TWebClientEnvToken = InjectionToken<AppWebEnvironment>;

/**
 * Application environment injection token.
 */
export const APP_ENV: TWebClientEnvToken = new InjectionToken<AppWebEnvironment>('APP_ENV');

export const appEnvProvider: Provider = {
  provide: APP_ENV,
  useFactory: () => new AppWebEnvironment(),
};

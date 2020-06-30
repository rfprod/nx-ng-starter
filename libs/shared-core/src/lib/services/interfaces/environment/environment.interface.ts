import { InjectionToken, Provider } from '@angular/core';

/**
 * Application environment constructor options interface.
 */
export interface IWebEnvironmentConstructorOptions {
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
export class WebEnvironment {
  public production = false;

  public appName: TAppName = 'Nx Ng Starter';

  public api = '';

  public envoyUrl? = 'http://localhost:8081';

  /**
   * Constructor.
   * By default generates dev environment.
   * @param options app env constructor options
   */
  constructor(options: IWebEnvironmentConstructorOptions = {}) {
    if ('production' in options) {
      this.production = options.production;
    }
    if ('appName' in options) {
      this.appName = options.appName;
    }
    if ('api' in options) {
      this.api = options.api;
    }
    if ('envoyUrl' in options) {
      this.envoyUrl = options.envoyUrl;
    }
  }
}

/**
 * Application environment injection token.
 */
export type TWebClientEnvToken = InjectionToken<WebEnvironment>;

/**
 * Application environment injection token.
 */
export const APP_ENV: TWebClientEnvToken = new InjectionToken<WebEnvironment>('APP_ENV');

export const appEnvProvider: Provider = {
  provide: APP_ENV,
  useFactory: () => new WebEnvironment(),
};

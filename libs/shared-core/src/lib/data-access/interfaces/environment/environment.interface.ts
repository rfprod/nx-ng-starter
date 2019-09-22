import { InjectionToken } from '@angular/core';

/**
 * Application environment constructor options interface.
 */
export interface IAppEnvironmentConstructorOptions {
  production?: boolean;
  appName?: string;
  api?: string;
}

/**
 * Application name type.
 */
export type AppName = 'Nx Ng Starter' | string;

/**
 * Application environment.
 * By default generates dev environment.
 */
export class AppEnvironment {
  public production = false;
  public appName: AppName = 'Nx Ng Starter';
  public api?: string;

  /**
   * Constructor.
   * By default generates dev environment.
   * @param options app env constructor options
   */
  constructor(options: IAppEnvironmentConstructorOptions = {}) {
    if ('production' in options) {
      this.production = options.production;
    }
    if ('appName' in options) {
      this.appName = options.appName;
    }
    if ('api' in options) {
      this.api = options.api;
    }
  }
}

/**
 * Application environment injection token.
 */
export type AppEnvToken = InjectionToken<AppEnvironment>;

/**
 * Application environment injection token.
 */
export const APP_ENV: AppEnvToken = new InjectionToken<AppEnvironment>('APP_ENV');

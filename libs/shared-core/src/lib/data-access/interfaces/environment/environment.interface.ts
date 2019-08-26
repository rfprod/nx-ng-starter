import { InjectionToken } from '@angular/core';

/**
 * Application environment constructor options interface.
 */
export interface AppEnvironmentConstructorOptions {
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

  /**
   * Constructor.
   * By default generates dev environment.
   * @param options app env constructor options
   */
  constructor(options: AppEnvironmentConstructorOptions = {}) {
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

  production: boolean = false;
  appName: AppName = 'Nx Ng Starter';
  api?: string;
}

/**
 * Application environment injection token.
 */
export type AppEnvToken = InjectionToken<AppEnvironment>;

/**
 * Application environment injection token.
 */
export const APP_ENV: AppEnvToken = new InjectionToken<AppEnvironment>('APP_ENV');

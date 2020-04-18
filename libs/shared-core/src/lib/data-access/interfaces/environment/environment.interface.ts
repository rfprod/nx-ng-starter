import { InjectionToken, Provider } from '@angular/core';

/**
 * Application environment constructor options interface.
 */
export interface IAppEnvironmentConstructorOptions {
  production?: boolean;
  firebase?: boolean;
  appName?: string;
  api?: string;
  envoyUrl?: string;
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
  // This flag indicates that api app build is intended to be deployed to firebase (firebase has specific features that are not working currently)
  public firebase?: boolean;
  public appName: AppName = 'Nx Ng Starter';
  public api = '';
  public envoyUrl? = 'http://localhost:8080';

  /**
   * Constructor.
   * By default generates dev environment.
   * @param options app env constructor options
   */
  constructor(options: IAppEnvironmentConstructorOptions = {}) {
    if ('production' in options) {
      this.production = options.production;
    }
    if ('firebase' in options) {
      this.firebase = options.firebase;
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
export type AppEnvToken = InjectionToken<AppEnvironment>;

/**
 * Application environment injection token.
 */
export const APP_ENV: AppEnvToken = new InjectionToken<AppEnvironment>('APP_ENV');

export const appEnvProvider: Provider = {
  provide: APP_ENV,
  useFactory: () => new AppEnvironment(),
};

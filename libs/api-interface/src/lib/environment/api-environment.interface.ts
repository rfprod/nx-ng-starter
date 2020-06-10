import { Provider } from '@nestjs/common';

/**
 * Application environment constructor options interface.
 */
export interface IApiEnvironmentConstructorOptions {
  production?: boolean;
  firebase?: boolean;
  appName?: string;
  envoyUrl?: string;
}

/**
 * Application name type.
 */
export type TApiAppName = 'Nx Ng Starter' | string;

/**
 * Application environment.
 * By default generates dev environment.
 */
export class ApiEnvironment {
  public production = false;

  public firebase?: boolean;

  public appName: TApiAppName = 'Nx Ng Starter API';

  public envoyUrl? = 'http://localhost:8081';

  /**
   * Constructor.
   * By default generates dev environment.
   * @param options app env constructor options
   */
  constructor(options: IApiEnvironmentConstructorOptions = {}) {
    if ('production' in options) {
      this.production = options.production;
    }
    if ('firebase' in options) {
      this.firebase = options.firebase;
    }
    if ('appName' in options) {
      this.appName = options.appName;
    }
    if ('envoyUrl' in options) {
      this.envoyUrl = options.envoyUrl;
    }
  }
}

/**
 * Api environment injection token.
 */
export const APP_ENV = 'API_ENV';

export const apiAppEnvProvider: Provider = {
  provide: APP_ENV,
  useFactory: () => new ApiEnvironment(),
};

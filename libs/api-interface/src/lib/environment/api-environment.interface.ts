import { Provider } from '@nestjs/common';

/**
 * Application environment constructor options interface.
 */
export interface IApiEnvironmentConstructorOptions {
  production?: boolean;
  firebase?: boolean;
  appName?: string;
  envoyUrl?: string;
  wsPort?: number;
}

/**
 * Application name type.
 */
export type TApiAppName = 'Nx Ng Starter API' | string;

export const defaultWsPort = 8081;

/**
 * Application environment.
 * By default generates dev environment.
 */
export class ApiEnvironment {
  public production = false;

  public firebase?: boolean;

  public appName: TApiAppName = 'Nx Ng Starter API';

  public envoyUrl? = 'http://localhost:8081';

  public wsPort = defaultWsPort;

  /**
   * Constructor.
   * By default generates dev environment.
   * @param options app env constructor options
   */
  constructor(options: IApiEnvironmentConstructorOptions = {}) {
    const keys = Object.keys(options);
    for (const key of keys) {
      this[key] = options[key];
    }
  }
}

/**
 * Api environment injection token.
 */
export const API_ENV = 'API_ENV';

export const apiAppEnvProvider: Provider = {
  provide: API_ENV,
  useFactory: () => new ApiEnvironment(),
};

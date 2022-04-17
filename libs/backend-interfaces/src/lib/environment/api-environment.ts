import { Provider } from '@nestjs/common';

import { initializeClassProperties } from '../utils/class.util';

/**
 * Application environment constructor options interface.
 */
export interface IApiEnvironment {
  production: boolean;
  firebase?: boolean;
  appName: string;
  envoyUrl?: string;
  wsPort: number;
}

/**
 * Application name type.
 */
export type TApiAppName = 'Nx Ng Starter API' | string;

export const defaultWsPort = 8081;

/**
 * API application environment.
 */
export class ApiEnvironment implements IApiEnvironment {
  public production = false;

  public firebase?: boolean;

  public appName: TApiAppName = 'Nx Ng Starter API';

  public envoyUrl? = 'http://localhost:8081';

  public wsPort = defaultWsPort;

  constructor(options?: Partial<ApiEnvironment>) {
    initializeClassProperties<Partial<ApiEnvironment>>(this, options);
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

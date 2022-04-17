import { Provider } from '@nestjs/common';

import { initializeClassProperties } from '../utils/class.util';

export interface IApiEnvironment {
  production: boolean;
  firebase: boolean;
  appName: string;
  envoyUrl: string;
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

  public firebase = false;

  public appName: TApiAppName = 'Nx Ng Starter API';

  public envoyUrl = 'http://localhost:8081';

  public wsPort = defaultWsPort;

  constructor(input?: Partial<ApiEnvironment>) {
    initializeClassProperties<Partial<ApiEnvironment>>(this, input);
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

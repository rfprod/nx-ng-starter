import { Provider } from '@nestjs/common';

import { initializeClassProperties } from '../utils/class.util';

export interface IApiEnvironment {
  production: boolean;
  firebase: boolean;
  appName: string;
  grpcUrl: string;
}

/**
 * Application name type.
 */
export type TApiAppName = 'Nx Ng Starter API' | string;

/**
 * API application environment.
 */
export class AppApiEnvironment implements IApiEnvironment {
  public production = false;

  public firebase = false;

  public appName: TApiAppName = 'Nx Ng Starter API';

  public grpcUrl = '0.0.0.0:50051';

  constructor(input?: Partial<AppApiEnvironment>) {
    initializeClassProperties<Partial<AppApiEnvironment>>(this, input);
  }
}

/**
 * Api environment injection token.
 */
export const API_ENV = 'API_ENV';

export const apiAppEnvProvider: Provider = {
  provide: API_ENV,
  useFactory: () => new AppApiEnvironment(),
};

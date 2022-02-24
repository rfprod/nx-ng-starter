import { Provider } from '@nestjs/common';

import { environment } from '../../environments/environment';

export const APP_ENVIRONMENT = 'APP_ENVIRONMENT';

export interface IServerProdEnvironment {
  production: boolean;
}

export const environmentProvider: Provider = {
  provide: APP_ENVIRONMENT,
  useValue: <IServerProdEnvironment>{ ...environment },
};

export const testingEnvironmentProvider: Provider = {
  provide: APP_ENVIRONMENT,
  useValue: <IServerProdEnvironment>{ production: false },
};

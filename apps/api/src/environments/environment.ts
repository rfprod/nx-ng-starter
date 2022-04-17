import { IApiEnvironment } from '@app/backend-interfaces';

/**
 * Development environment variables.
 * This file can be replaced during build by using the `fileReplacements` array.
 * `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
 * The list of file replacements can be found in `angular.json`.
 */
export const environment: IApiEnvironment = {
  production: false,
  firebase: false,
  appName: 'Nx Ng Starter API',
  envoyUrl: '',
  wsPort: 8081,
};

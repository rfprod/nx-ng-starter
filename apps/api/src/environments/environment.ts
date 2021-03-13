import { ApiEnvironment } from '@nx-ng-starter/backend-interfaces';

/**
 * Development environment variables.
 * This file can be replaced during build by using the `fileReplacements` array.
 * `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
 * The list of file replacements can be found in `angular.json`.
 */
export const environment: ApiEnvironment = {
  production: false,
  appName: 'Nx Ng Starter API',
  wsPort: 8081,
};

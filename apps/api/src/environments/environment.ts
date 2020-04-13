import { AppEnvironment } from '@nx-ng-starter/shared-core/data-access';

/**
 * Development environment variables.
 * This file can be replaced during build by using the `fileReplacements` array.
 * `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
 * The list of file replacements can be found in `angular.json`.
 */
export const environment: AppEnvironment = {
  production: false,
  appName: 'Nx Ng Starter API',
  api: '', // If api app has any external API, defined it's url here
};

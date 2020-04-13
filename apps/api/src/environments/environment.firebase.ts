import { AppEnvironment } from '@nx-ng-starter/shared-core/data-access';

/**
 * Production environment variables.
 */
export const environment: AppEnvironment = {
  production: true,
  firebase: true,
  appName: 'Nx Ng Starter API',
  api: '', // If api app has any external API, defined it's url here
};

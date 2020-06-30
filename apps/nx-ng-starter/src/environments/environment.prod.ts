import { AppWebEnvironment } from '@nx-ng-starter/shared-core/interfaces';

/**
 * Production environment variables.
 */
export const environment: AppWebEnvironment = {
  production: true,
  appName: 'Nx Ng Starter Client',
  api: window.location.origin.includes('localhost')
    ? 'http://localhost:8080/api'
    : `${window.location.origin}/api`,
  envoyUrl: 'http://localhost:8081', // TODO
};

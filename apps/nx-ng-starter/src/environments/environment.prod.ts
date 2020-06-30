import { WebEnvironment } from '@nx-ng-starter/shared-core/services';

/**
 * Production environment variables.
 */
export const environment: WebEnvironment = {
  production: true,
  appName: 'Nx Ng Starter Client',
  api: window.location.origin.includes('localhost')
    ? 'http://localhost:8080/api'
    : `${window.location.origin}/api`,
  envoyUrl: 'http://localhost:8081', // TODO
};

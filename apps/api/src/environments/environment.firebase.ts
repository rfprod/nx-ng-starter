import { ApiEnvironment } from '@nx-ng-starter/api-interface';

/**
 * Production environment variables.
 */
export const environment: ApiEnvironment = {
  production: true,
  firebase: true,
  appName: 'Nx Ng Starter API',
  wsPort: 8081,
};

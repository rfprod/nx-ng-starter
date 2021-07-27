import { ApiEnvironment } from '@app/backend-interfaces';

/**
 * Production environment variables.
 */
export const environment: ApiEnvironment = {
  production: true,
  firebase: true,
  appName: 'Nx Ng Starter API',
  wsPort: 8081,
};

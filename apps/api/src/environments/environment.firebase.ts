import { IApiEnvironment } from '@app/backend-interfaces';

/**
 * Production environment variables.
 */
export const environment: IApiEnvironment = {
  production: true,
  firebase: true,
  appName: 'Nx Ng Starter API',
  grpcUrl: '',
};

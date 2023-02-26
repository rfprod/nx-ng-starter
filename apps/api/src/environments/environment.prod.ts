import { IApiEnvironment } from '@app/backend-interfaces';

/**
 * Production environment variables.
 */
export const environment: IApiEnvironment = {
  production: true,
  firebase: false,
  appName: 'Nx Ng Starter API',
  grpcUrl: '0.0.0.0:50051',
};

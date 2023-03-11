import { IDocumentationEnvironment } from '../app/interfaces/environment.interface';
import { appEnvFactory } from './environment.config';

/**
 * Develompent environment variables.
 * This file can be replaced during build by using the 'fileReplacements' array.
 * 'ng build --prod' replaces 'environment.ts' with 'environment.prod.ts'.
 * The list of file replacements can be found in 'angular.json'.
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as 'zone.run', 'zoneDelegate.invokeTask'.
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 * import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
 */
export const environment: IDocumentationEnvironment = {
  production: false,
  testing: false,
  appName: 'Documentation',
  description: 'Nx Ng Starter documentation',
  ...appEnvFactory(),
  // eslint-disable-next-line prettier/prettier -- no need to make it pretty here due autogeneration
  mdFilePaths: ['libs/backend-interfaces/README.md', 'libs/client-store-http-api/README.md', 'libs/client-directives/README.md', 'libs/backend-gql/README.md', 'libs/client-util-sentry/README.md', 'libs/client-util/README.md', 'libs/client-store-theme/README.md', 'libs/client-store-http-progress/README.md', 'libs/backend-auth/README.md', 'libs/client-dashboards/README.md', 'libs/client-testing-unit/README.md', 'libs/client-store-sidebar/README.md', 'libs/client-store/README.md', 'libs/client-util-eliza/README.md', 'libs/client-pwa-offline/README.md', 'libs/backend-grpc/README.md', 'libs/client-store-diagnostics/README.md', 'libs/backend-diagnostics/README.md', 'libs/client-diagnostics/README.md', 'libs/client-elements/README.md', 'libs/client-store-chatbot/README.md', 'libs/client-material/README.md', 'libs/client-chatbot/README.md', 'libs/client-d3-charts/README.md', 'libs/client-service-worker/README.md', 'libs/client-core-components/README.md', 'libs/client-translate/README.md', 'libs/client-gql/README.md', 'libs/client-store-user/README.md', 'libs/backend-logger/README.md', 'libs/client-store-feature-access/README.md', 'libs/client-util-ngrx/README.md', 'libs/client-grpc/README.md', 'libs/client-store-router/README.md', 'tools/shell/README.md', 'libs/client-core/README.md', 'libs/client-testing-e2e/README.md', 'libs/proto/README.md', 'libs/client-sidebar/README.md', 'tools/README.md'],
};

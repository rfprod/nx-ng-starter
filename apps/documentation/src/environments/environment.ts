import { IDocAppEnvironment } from '../app/interfaces/environment.interface';

/**
 * Develompent environment variables.
 * This file can be replaced during build by using the 'fileReplacements' array.
 * 'ng build --prod' replaces 'environment.ts' with 'environment.prod.ts'.
 * The list of file replacements can be found in 'angular.json'.
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as 'zone.run', 'zoneDelegate.invokeTask'.
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 * import 'zone.js/dist/zone-error';  // Included with Angular CLI.
 */
export const environment: IDocAppEnvironment = {
  production: false,
  appName: 'Documentation',
  // eslint-disable-next-line prettier/prettier -- this is needed so that this array can be updated programmatically, the array should be one liner
  mdFilePaths: ['libs/client-services/README.md', 'libs/client-translate/README.md', 'tools/ts/README.md', 'tools/shell/README.md', 'libs/client-components/README.md', 'libs/client-core/README.md', 'libs/client-gql/README.md', 'libs/client-util/README.md', 'libs/client-material/README.md', 'tools/ts/UNIT_COVERAGE.md', 'libs/proto/README.md', 'libs/client-chatbot/README.md', 'libs/client-unit-testing/README.md', 'libs/client-sidebar/README.md', 'libs/backend-interfaces/README.md', 'apps/README.md', 'libs/client-store/README.md', 'libs/README.md'],
};

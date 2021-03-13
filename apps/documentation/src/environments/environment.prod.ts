import { IDocAppEnvironment } from '../app/interfaces/environment.interface';

export const environment: IDocAppEnvironment = {
  production: true,
  appName: 'Documentation',
  // eslint-disable-next-line prettier/prettier -- this is needed so that this array can be updated programmatically, the array should be one liner
  mdFilePaths: ['libs/client-services/README.md', 'libs/client-translate/README.md', 'tools/ts/README.md', 'tools/shell/README.md', 'libs/client-components/README.md', 'libs/client-core/README.md', 'libs/client-gql/README.md', 'libs/client-util/README.md', 'libs/client-material/README.md', 'tools/ts/UNIT_COVERAGE.md', 'libs/proto/README.md', 'libs/client-chatbot/README.md', 'libs/client-unit-testing/README.md', 'libs/client-sidebar/README.md', 'libs/backend-interfaces/README.md', 'apps/README.md', 'libs/client-store/README.md', 'libs/README.md'],
};

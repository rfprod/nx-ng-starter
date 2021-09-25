import { IDocAppEnvironment } from '../app/interfaces/environment.interface';

export const environment: IDocAppEnvironment = {
  production: true,
  appName: 'Documentation',
  description: 'Nx Ng Starter documentation',
  // eslint-disable-next-line prettier/prettier -- no need to make it pretty here due autogeneration
  mdFilePaths: ['libs/client-services/README.md', 'libs/client-translate/README.md', 'libs/backend-gql/README.md', 'libs/client-diagnostics/README.md', 'tools/ts/README.md', 'tools/shell/README.md', 'libs/client-components/README.md', 'libs/client-core/README.md', 'libs/client-gql/README.md', 'libs/backend-auth/README.md', 'libs/backend-interfaces/README.md', 'libs/backend-grpc/README.md', 'libs/client-util/README.md', 'libs/client-unit-testing/README.md', 'libs/client-material/README.md', 'tools/ts/UNIT_COVERAGE.md', 'libs/proto/README.md', 'libs/client-chatbot/README.md', 'libs/client-sidebar/README.md', 'libs/backend-websocket/README.md', 'apps/README.md', 'libs/client-store/README.md', 'libs/README.md', 'libs/backend-logger/README.md', 'tools/README.md'],
};

import { IDocAppEnvironment } from '../app/interfaces/environment.interface';

export const environment: IDocAppEnvironment = {
  production: true,
  appName: 'Documentation',
  // eslint-disable-next-line prettier/prettier, @typescript-eslint/comma-spacing
  mdFilePaths: ['libs/client-services/README.md','libs/client-translate/README.md','tools/ts/README.md','tools/shell/README.md','libs/client-components/README.md','libs/client-core/README.md','libs/client-gql/README.md','libs/client-util/README.md','libs/client-material/README.md','tools/ts/UNIT_COVERAGE.md','libs/proto/README.md','libs/mocks-core/README.md','libs/api-interface/README.md','apps/README.md','libs/client-store/README.md','libs/README.md','tools/README.md'],
};

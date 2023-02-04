import { Config } from '@jest/types';

const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

const config: Config.InitialOptions = {
  coverageDirectory: '../../coverage/libs/client-service-worker',
  coverageThreshold: {
    // TODO: bump unit test coverage and remove this override
    global: {
      branches: 0,
      functions: 16,
      lines: 48,
      statements: 48,
    },
  },
  displayName: 'client-service-worker',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
};

export default config;

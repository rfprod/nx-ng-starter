import type { Config } from '@jest/types';

const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

const config: Config.InitialOptions = {
  coverageDirectory: '../../coverage/libs/client-gql',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  displayName: 'client-gql',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
};

export default config;

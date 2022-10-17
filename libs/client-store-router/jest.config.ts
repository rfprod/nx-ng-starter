import { Config } from '@jest/types';

const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

const config: Config.InitialOptions = {
  coverageDirectory: '../../coverage/libs/client-store-router',
  coverageThreshold: {
    // TODO: bump unit test coverage and remove this override
    global: {
      branches: 100,
      functions: 61,
      lines: 81,
      statements: 73,
    },
  },
  displayName: 'client-store-router',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
};

export default config;

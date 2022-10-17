import { Config } from '@jest/types';

const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

const config: Config.InitialOptions = {
  coverageDirectory: '../../coverage/libs/client-util-eliza',
  coverageThreshold: {
    // TODO: bump unit test coverage and remove this override
    global: {
      branches: 42,
      functions: 55,
      lines: 55,
      statements: 52,
    },
  },
  displayName: 'client-util-eliza',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
};

export default config;

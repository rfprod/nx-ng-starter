import type { Config } from '@jest/types';

const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

const config: Config.InitialOptions = {
  coverageDirectory: '../../coverage/libs/client-util-sentry',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 75,
      lines: 91,
      statements: 93,
    },
  },
  displayName: 'client-util-sentry',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
};

export default config;

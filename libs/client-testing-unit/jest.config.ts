import type { Config } from '@jest/types';

const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

const config: Config.InitialOptions = {
  coverageDirectory: '../../coverage/libs/client-testing-unit',
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 97,
      lines: 98,
      statements: 98,
    },
  },
  displayName: 'client-testing-unit',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
};

export default config;

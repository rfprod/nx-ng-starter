import { Config } from '@jest/types';

const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

const config: Config.InitialOptions = {
  coverageDirectory: '../../coverage/libs/client-diagnostics',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 90,
      lines: 98,
      statements: 98,
    },
  },
  displayName: 'client-diagnostics',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
};

export default config;

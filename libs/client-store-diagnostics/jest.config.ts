import { Config } from '@jest/types';

const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

const config: Config.InitialOptions = {
  coverageDirectory: '../../coverage/libs/client-store-diagnostics',
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 78,
      lines: 95,
      statements: 92,
    },
  },
  displayName: 'client-store-diagnostics',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
};

export default config;

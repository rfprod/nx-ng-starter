import { Config } from '@jest/types';

const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

const config: Config.InitialOptions = {
  coverageDirectory: '../../coverage/libs/client-d3-charts',
  coverageThreshold: {
    // TODO: bump coverage thresholds
    global: {
      branches: 4,
      functions: 27,
      lines: 28,
      statements: 30,
    },
  },
  displayName: 'client-d3-charts',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
};

export default config;

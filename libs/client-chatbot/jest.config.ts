import { Config } from '@jest/types';

const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

const config: Config.InitialOptions = {
  coverageDirectory: '../../coverage/libs/client-chatbot',
  coverageThreshold: {
    // TODO: bump unit test coverage and remove this override
    global: {
      branches: 81,
      functions: 100,
      lines: 90,
      statements: 90,
    },
  },
  displayName: 'client-chatbot',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
};

export default config;

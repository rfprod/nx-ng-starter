const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

const config = {
  coverageDirectory: '../../coverage/libs/client-core-components',
  coverageThreshold: {
    global: {
      branches: 69,
      functions: 100,
      lines: 94,
      statements: 95,
    },
  },
  displayName: 'client-core-components',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
};

export default config;

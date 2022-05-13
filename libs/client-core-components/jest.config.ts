const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

const config = {
  coverageDirectory: '../../coverage/libs/client-core-components',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
  displayName: 'client-core-components',
  coverageThreshold: {
    global: {
      branches: 69,
      functions: 100,
      lines: 94,
      statements: 95,
    },
  },
  preset: '../../jest.preset.js',
};

export default config;

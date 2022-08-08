const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

const config = {
  coverageDirectory: '../../coverage/libs/client-store-user',
  coverageThreshold: {
    // TODO: complete the store logic and increase unit test coverage
    global: {
      branches: 100,
      functions: 88,
      lines: 100,
      statements: 96,
    },
  },
  displayName: 'client-store-user',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
};

export default config;

const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

const config = {
  coverageDirectory: '../../coverage/libs/client-store-http-progress',
  coverageThreshold: {
    // TODO: bump unit test coverage and remove this override
    global: {
      branches: 93,
      functions: 98,
      lines: 99,
      statements: 98,
    },
  },
  displayName: 'client-store-http-progress',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
};

export default config;

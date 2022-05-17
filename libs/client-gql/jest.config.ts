const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

const config = {
  coverageDirectory: '../../coverage/libs/client-gql',
  coverageThreshold: {
    // TODO: bump unit test coverage and remove this override
    global: {
      branches: 55,
      functions: 63,
      lines: 67,
      statements: 70,
    },
  },
  displayName: 'client-gql',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
};

export default config;

const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/client-store',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
  displayName: 'client-store',
  coverageThreshold: {
    // TODO: bump unit test coverage and remove this override
    global: {
      branches: 26.5,
      functions: 30.76,
      lines: 34.74,
      statements: 35.2,
    },
  },
};

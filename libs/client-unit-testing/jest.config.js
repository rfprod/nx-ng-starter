const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/client-unit-testing',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
  displayName: 'client-unit-testing',
  coverageThreshold: {
    // TODO: bump unit test coverage and remove this override
    global: {
      branches: 1,
      functions: 31,
      lines: 52,
      statements: 54,
    },
  },
};

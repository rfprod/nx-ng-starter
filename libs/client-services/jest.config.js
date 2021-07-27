const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/client-services',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
  displayName: 'client-services',
  coverageThreshold: {
    // TODO: bump unit test coverage and remove this override
    global: {
      branches: 0,
      functions: 28.57,
      lines: 69.57,
      statements: 73.33,
    },
  },
};

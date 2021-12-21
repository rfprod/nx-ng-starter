const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/client-translate',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
  displayName: 'client-translate',
  coverageThreshold: {
    // TODO: bump unit test coverage and remove this override
    global: {
      branches: 83.33,
      functions: 92,
      lines: 88,
      statements: 88,
    },
  },
};

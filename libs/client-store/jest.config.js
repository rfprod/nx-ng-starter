const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/client-store',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
  displayName: 'client-store',
  coverageThreshold: { // TODO: bump unit test coverage and remove this override
    global: {
      branches: 26.73,
      functions: 33.01,
      lines: 46.01,
      statements: 47.26,
    },
  },
};

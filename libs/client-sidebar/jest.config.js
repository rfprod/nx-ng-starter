const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/client-sidebar',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
  displayName: 'client-sidebar',
  coverageThreshold: { // TODO: bump unit test coverage and remove this override
    global: {
      branches: 100,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};

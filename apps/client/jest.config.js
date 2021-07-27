const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/client',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
  displayName: 'client',
  coverageThreshold: {
    // TODO: bump unit test coverage and remove this override
    global: {
      branches: 0,
      functions: 11.76,
      lines: 8.45,
      statements: 10.47,
    },
  },
};

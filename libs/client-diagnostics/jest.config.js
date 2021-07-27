const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/client-diagnostics',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
  displayName: 'client-diagnostics',
  coverageThreshold: {
    // TODO: bump unit test coverage and remove this override
    global: {
      branches: 0,
      functions: 36.36,
      lines: 46.81,
      statements: 48.65,
    },
  },
};

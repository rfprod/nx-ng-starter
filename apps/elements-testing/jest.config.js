const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/elements-testing',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
  displayName: 'elements-testing',
  coverageThreshold: {
    // TODO: bump unit test coverage and remove this override
    global: {
      branches: 100,
      functions: 100,
      lines: 50,
      statements: 50,
    },
  },
};

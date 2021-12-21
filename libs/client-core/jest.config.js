const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/client-core',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
  displayName: 'client-core',
  coverageThreshold: {
    // TODO: bump unit test and remove this override
    global: {
      branches: 100,
      functions: 0,
      lines: 80,
      statements: 80,
    },
  },
};

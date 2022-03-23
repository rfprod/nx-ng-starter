const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/client-d3-charts',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
  displayName: 'client-d3-charts',
  coverageThreshold: {
    // TODO: bump coverage thresholds
    global: {
      branches: 3,
      functions: 13,
      lines: 21,
      statements: 24,
    },
  },
};

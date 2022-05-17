const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

const config = {
  coverageDirectory: '../../coverage/libs/client-d3-charts',
  coverageThreshold: {
    // TODO: bump coverage thresholds
    global: {
      branches: 3,
      functions: 12,
      lines: 21,
      statements: 23,
    },
  },
  displayName: 'client-d3-charts',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
};

export default config;

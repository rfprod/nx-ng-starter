const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/client-sidebar',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
  displayName: 'client-sidebar',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 80,
      lines: 85,
      statements: 88,
    },
  },
};

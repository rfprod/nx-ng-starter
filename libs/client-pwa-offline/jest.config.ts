const jestPresetAngularSerializers = require('jest-preset-angular/build/serializers');

const config = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/client-pwa-offline',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  snapshotSerializers: jestPresetAngularSerializers,
  displayName: 'client-pwa-offline',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

export default config;

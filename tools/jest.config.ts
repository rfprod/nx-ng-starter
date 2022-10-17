import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageDirectory: '../coverage/tools',
  coverageThreshold: {
    global: {
      branches: 88,
      functions: 98,
      lines: 99,
      statements: 99,
    },
  },
  displayName: 'tools',
  preset: '../jest.preset.js',
  globals: {},
};

export default config;

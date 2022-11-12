import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageDirectory: '../coverage/tools',
  coverageThreshold: {
    global: {
      branches: 72,
      functions: 98,
      lines: 91,
      statements: 91,
    },
  },
  displayName: 'tools',
  preset: '../jest.preset.js',
  globals: {},
};

export default config;

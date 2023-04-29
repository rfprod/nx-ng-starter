import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageDirectory: '../coverage/tools',
  coverageThreshold: {
    global: {
      branches: 84,
      functions: 98,
      lines: 95,
      statements: 96,
    },
  },
  displayName: 'tools',
  preset: '../jest.preset.js',
};

export default config;

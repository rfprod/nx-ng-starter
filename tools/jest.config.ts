import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageDirectory: '../coverage/tools',
  coverageThreshold: {
    global: {
      branches: 69,
      functions: 79,
      lines: 81,
      statements: 80,
    },
  },
  displayName: 'tools',
  preset: '../jest.preset.js',
};

export default config;

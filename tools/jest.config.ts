import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageDirectory: '../coverage/tools',
  coverageThreshold: {
    global: {
      branches: 71,
      functions: 79,
      lines: 82,
      statements: 81,
    },
  },
  displayName: 'tools',
  preset: '../jest.preset.js',
};

export default config;

import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageDirectory: '../coverage/tools',
  coverageThreshold: {
    global: {
      branches: 69,
      functions: 77,
      lines: 80,
      statements: 79,
    },
  },
  displayName: 'tools',
  preset: '../jest.preset.js',
};

export default config;

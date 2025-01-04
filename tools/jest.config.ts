import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageDirectory: '../coverage/tools',
  coverageThreshold: {
    global: {
      branches: 68,
      functions: 77,
      lines: 78,
      statements: 77,
    },
  },
  displayName: 'tools',
  preset: '../jest.preset.js',
};

export default config;

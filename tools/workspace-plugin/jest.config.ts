import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageDirectory: '../../coverage/tools/workspace-plugin',
  coverageThreshold: {
    global: {
      branches: 24,
      functions: 55,
      lines: 57,
      statements: 57,
    },
  },
  displayName: 'workspace-plugin',
  preset: '../../jest.preset.js',
};

export default config;

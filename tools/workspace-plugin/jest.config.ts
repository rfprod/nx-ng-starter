import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageDirectory: '../../coverage/tools/workspace-plugin',
  coverageThreshold: {
    global: {
      branches: 28,
      functions: 57,
      lines: 63,
      statements: 63,
    },
  },
  displayName: 'workspace-plugin',
  preset: '../../jest.preset.js',
};

export default config;

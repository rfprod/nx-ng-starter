import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageDirectory: '../../coverage/tools/workspace-plugin',
  coverageThreshold: {
    global: {
      branches: 24,
      functions: 55,
      lines: 59,
      statements: 59,
    },
  },
  displayName: 'workspace-plugin',
  preset: '../../jest.preset.js',
};

export default config;

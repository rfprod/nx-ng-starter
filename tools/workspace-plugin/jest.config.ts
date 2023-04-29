import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageDirectory: '../../coverage/tools/workspace-plugin',
  coverageThreshold: {
    global: {
      branches: 83,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  displayName: 'workspace-plugin',
  preset: '../../jest.preset.js',
};

export default config;

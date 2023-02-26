import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageDirectory: '../../coverage/libs/backend-diagnostics',
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 80,
      lines: 84,
      statements: 84,
    },
  },
  displayName: 'backend-diagnostics',
  preset: '../../jest.preset.js',
  globals: {},
  resolver: '../../tools/js/jest-nestjs-resolver.js',
  transform: {
    '^.+\\.(ts|js)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
};

export default config;

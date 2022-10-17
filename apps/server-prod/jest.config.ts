import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageDirectory: '../../coverage/apps/server-prod',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  displayName: 'server-prod',
  preset: '../../jest.preset.js',
  globals: {},
  resolver: '../../tools/js/jest-nestjs-resolver.js',
  testEnvironment: 'node',
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

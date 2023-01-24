import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageDirectory: '../../coverage/libs/backend-grpc',
  coverageThreshold: {
    // TODO: bump unit test coverage and remove this override
    global: {
      branches: 20,
      functions: 23,
      lines: 55,
      statements: 52,
    },
  },
  displayName: 'backend-grpc',
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

const config = {
  coverageDirectory: '../../coverage/libs/backend-gql',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 72,
      lines: 88,
      statements: 90,
    },
  },
  displayName: 'backend-gql',
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

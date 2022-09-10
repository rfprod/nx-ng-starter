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
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  preset: '../../jest.preset.js',
  resolver: '../../tools/js/jest-nestjs-resolver.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|js)$': 'ts-jest',
  },
};

export default config;

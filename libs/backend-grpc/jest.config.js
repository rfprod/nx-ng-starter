module.exports = {
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/backend-grpc',
  displayName: 'backend-grpc',
  coverageThreshold: {
    // TODO: bump unit test coverage and remove this override
    global: {
      branches: 20,
      functions: 23,
      lines: 55,
      statements: 52,
    },
  },
};

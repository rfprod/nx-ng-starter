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
  coverageDirectory: '../../coverage/libs/backend-auth',
  displayName: 'backend-auth',
  coverageThreshold: {
    // TODO: bump unit test coverage and remove this override
    global: {
      branches: 100,
      functions: 30.77,
      lines: 38.1,
      statements: 41.67,
    },
  },
};

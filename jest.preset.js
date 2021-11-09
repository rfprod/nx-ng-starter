const nxPreset = require('@nrwl/jest/preset');

module.exports = {
  ...nxPreset,
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: ['node_modules/(?!@ngxs|simple-git|@angular)'],
  moduleFileExtensions: ['ts', 'html', 'js', 'mjs', 'json'],
  resolver: '@nrwl/jest/plugins/resolver',
  // resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
  coverageReporters: ['html-spa', 'json-summary'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverageFrom: ['**/*.ts', '!**/node_modules/**', '!**/coverage/**', '!**/generated/**', '!**/grpc/**', '!**/ts/**', '!**/*.js'],
  collectCoverage: true,
  cacheDirectory: '/tmp/jest_rs/nx-ng-starter',
};

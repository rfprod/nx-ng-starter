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
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: ['node_modules/(?!@ngxs|simple-git)'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  resolver: '@nrwl/jest/plugins/resolver',
  coverageReporters: ['html-spa', 'json-summary'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  collectCoverage: true,
  cacheDirectory: '/tmp/jest_rs/nx-ng-starter',
};

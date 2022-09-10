const nxPreset = require('@nrwl/jest/preset').default;
const { pathsToModuleNameMapper } = require('ts-jest');

const { paths } = require('./tsconfig.base.json').compilerOptions;

module.exports = {
  ...nxPreset,
  testMatch: ['**/+(*.)+(spec).+(ts|js)?(x)'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'mjs', 'json'],
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
  },
  // resolver: '@nrwl/jest/plugins/resolver',
  resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: '<rootDir>/../../' }),
  coverageReporters: ['html-spa', 'json-summary'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverageFrom: [
    '**/*.ts',
    '!**/*.d.ts',
    '!**/index.ts',
    '!**/main.ts',
    '!**/polyfills.ts',
    '!**/test-setup.ts',
    '!**/environments/**',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/generated/**',
    '!**/grpc/**',
    '!**/ts/**',
    '!**/*.js',
    '!**/*.stories.ts',
    '!**/*.module.ts',
    '!**/jest.*.ts',
  ],
  collectCoverage: true,
  cacheDirectory: '/tmp/jest_rs/nx-ng-starter',
};

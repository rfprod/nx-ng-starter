const nxPreset = require('@nrwl/jest/preset').default;
const { pathsToModuleNameMapper } = require('ts-jest');

const { paths } = require('./tsconfig.base.json').compilerOptions;

module.exports = {
  ...nxPreset,
  testMatch: ['**/+(*.)+(spec).+(ts|js)?(x)'],
  globals: {},
  moduleFileExtensions: ['ts', 'html', 'js', 'mjs', 'json'],
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
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
  /* TODO: Update to latest Jest snapshotFormat
   * By default Nx has kept the older style of Jest Snapshot formats
   * to prevent breaking of any existing tests with snapshots.
   * It's recommend you update to the latest format.
   * You can do this by removing snapshotFormat property
   * and running tests with --update-snapshot flag.
   * Example: "nx affected --targets=test --update-snapshot"
   * More info: https://jestjs.io/docs/upgrading-to-jest29#snapshot-format
   */
  snapshotFormat: { escapeString: true, printBasicPrototype: true },
};

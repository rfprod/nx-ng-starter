module.exports = {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [
        'jest-preset-angular/InlineFilesTransformer',
        'jest-preset-angular/StripStylesTransformer',
        'jest-preset-angular/InlineHtmlStripStylesTransformer',
      ],
    },
  },
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!@ngxs)'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  resolver: '@nrwl/jest/plugins/resolver',
  coverageReporters: ['html'],
  collectCoverage: true,
};

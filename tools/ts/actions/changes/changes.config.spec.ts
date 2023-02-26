import { changesConfig } from './changes.config';

describe('changesConfig', () => {
  it('should match an object', () => {
    expect(changesConfig).toMatchObject({
      dependencies: ['yarn.lock'],
      electron: ['.electron/**', 'index.js'],
      mobile: ['android/**', 'capacitor.config.json'],
      packageCharts: ['libs/client-d3-charts/package.json'],
      packageEliza: ['libs/client-util-eliza/package.json'],
      packageBackendDiagnostics: ['libs/backend-diagnostics/package.json'],
      packages: ['libs/client-d3-charts/package.json', 'libs/client-util-eliza/package.json'],
      shelltools: ['tools/shell/**'],
      src: [
        'apps/**',
        'libs/**',
        'tools/executors/**',
        'tools/generators/**',
        'tools/ts/**',
        'tools/*.json',
        'tsconfig*',
        'nx.json',
        'angular.json',
        'babel.config.json',
        'package.json',
        'jest*',
        '.eslint*',
        '.prettier*',
        '.protolint.yaml',
        '.stylelint*',
      ],
      storybook: ['.storybook/**', '*.stories.ts'],
    });
  });
});

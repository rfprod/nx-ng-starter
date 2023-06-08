import { changesConfig } from './changes.config';

describe('changesConfig', () => {
  it('should match an object', () => {
    const expectation = {
      dependencies: ['yarn.lock'],
      electron: ['.electron/**', 'index.js'],
      mobile: ['android/**', 'capacitor.config.json'],
      packageCharts: ['libs/client-d3-charts/package.json'],
      packageEliza: ['libs/client-util-eliza/package.json'],
      packagePwaOffline: ['libs/client-pwa-offline/package.json'],
      packageBackendDiagnostics: ['libs/backend-diagnostics/package.json'],
      packages: ['libs/client-d3-charts/package.json', 'libs/client-util-eliza/package.json', 'libs/backend-diagnostics/package.json'],
      shelltools: ['tools/shell/**'],
      src: [
        'apps/**',
        'libs/**',
        'tools/executors/**',
        'tools/workspace-plugin/**',
        'tools/ts/**',
        'tools/*.json',
        'tsconfig*',
        'nx.json',
        'babel.config.json',
        'package.json',
        'jest*',
        '.eslint*',
        '.prettier*',
        '.protolint.yaml',
        '.stylelint*',
      ],
      storybook: ['.storybook/**', '*.stories.ts'],
    };

    expect(changesConfig).toMatchObject({
      ...expectation,
      deploy: [...expectation.dependencies, ...expectation.src, ...expectation.storybook],
    });
  });
});

const dependencies = ['yarn.lock'];
const electron = ['.electron/**', 'index.js'];
const mobile = ['android/**', 'capacitor.config.json'];
const packageCharts = ['libs/client-d3-charts/package.json'];
const packageEliza = ['libs/client-util-eliza/package.json'];
const packageGuidedTour = ['libs/client-guided-tour/package.json'];
const packagePwaOffline = ['libs/client-pwa-offline/package.json'];
const packageBackendDiagnostics = ['libs/backend-diagnostics/package.json'];
const packages = [...packageCharts, ...packageEliza, ...packageGuidedTour, ...packageBackendDiagnostics];
const shelltools = ['tools/shell/**'];
const src = [
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
  'vite*',
  '.eslint*',
  '.prettier*',
  '.protolint.yaml',
  '.stylelint*',
];
const storybook = ['.storybook/**', '*.stories.ts'];

export const changesConfig = {
  dependencies,
  electron,
  mobile,
  packageCharts,
  packageEliza,
  packageGuidedTour,
  packagePwaOffline,
  packageBackendDiagnostics,
  packages,
  shelltools,
  src,
  storybook,
  deploy: [...dependencies, ...src, ...storybook],
};

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vitest/config';

import { sharedTestConfig } from '../../vitest.shared';

export default defineConfig({
  root: __dirname,
  cacheDir: '/tmp/vitest/nx-ng-starter/apps/api',
  plugins: [nxViteTsPaths()],
  test: {
    ...sharedTestConfig,
    environment: 'node',
    coverage: {
      enabled: true,
      clean: true,
      reporter: ['text', 'json', 'html', 'json-summary'],
      reportsDirectory: '../../dist/coverage/apps/api',
      provider: 'istanbul',
      thresholds: {
        branches: 0,
        functions: 0,
        lines: 0,
        statements: 0,
      },
    },
    include: ['src/**/*.spec.ts'],
  },
});

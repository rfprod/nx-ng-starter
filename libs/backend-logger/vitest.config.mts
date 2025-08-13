import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vitest/config';

import { sharedTestConfig } from '../../vitest.shared';

export default defineConfig({
  root: __dirname,
  cacheDir: '/tmp/vitest/nx-ng-starter/libs/backend-logger',
  plugins: [nxViteTsPaths()],
  test: {
    ...sharedTestConfig,
    environment: 'node',
    coverage: {
      enabled: true,
      clean: true,
      reporter: ['text', 'json', 'html', 'json-summary'],
      reportsDirectory: '../../dist/coverage/libs/backend-logger',
      provider: 'istanbul',
      thresholds: {
        branches: 100,
        functions: 50,
        lines: 60,
        statements: 57,
      },
    },
    include: ['src/**/*.spec.ts'],
  },
});

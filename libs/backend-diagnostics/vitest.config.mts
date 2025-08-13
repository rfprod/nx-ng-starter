import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vitest/config';

import { sharedTestConfig } from '../../vitest.shared';

export default defineConfig({
  root: __dirname,
  cacheDir: '/tmp/vitest/nx-ng-starter/libs/backend-diagnostics',
  plugins: [nxViteTsPaths()],
  test: {
    ...sharedTestConfig,
    environment: 'node',
    coverage: {
      enabled: true,
      clean: true,
      reporter: ['text', 'json', 'html', 'json-summary'],
      reportsDirectory: '../../dist/coverage/libs/backend-diagnostics',
      provider: 'istanbul',
      thresholds: {
        branches: 50,
        functions: 75,
        lines: 79,
        statements: 79,
      },
    },
    include: ['src/**/*.spec.ts'],
  },
});

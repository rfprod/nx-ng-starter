import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vitest/config';

import { sharedTestConfig } from '../../vitest.shared';

export default defineConfig({
  root: __dirname,
  cacheDir: '/tmp/vitest/nx-ng-starter/libs/backend-interfaces',
  plugins: [nxViteTsPaths()],
  test: {
    ...sharedTestConfig,
    environment: 'node',
    coverage: {
      enabled: true,
      clean: true,
      reporter: ['text', 'json', 'html', 'json-summary'],
      reportsDirectory: '../../dist/coverage/libs/backend-interfaces',
      provider: 'istanbul',
      thresholds: {
        branches: 100,
        functions: 77,
        lines: 91,
        statements: 92,
      },
    },
    include: ['src/**/*.spec.ts'],
  },
});

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vitest/config';

import { sharedTestConfig } from '../../vitest.shared';

export default defineConfig({
  root: __dirname,
  cacheDir: '/tmp/vitest/nx-ng-starter/libs/backend-grpc',
  plugins: [nxViteTsPaths()],
  test: {
    ...sharedTestConfig,
    environment: 'node',
    coverage: {
      enabled: true,
      clean: true,
      reporter: ['text', 'json', 'html', 'json-summary'],
      reportsDirectory: '../../dist/coverage/libs/backend-grpc',
      provider: 'istanbul',
      thresholds: {
        branches: 16,
        functions: 20,
        lines: 51,
        statements: 47,
      },
    },
    include: ['src/**/*.spec.ts'],
  },
});

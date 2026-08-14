import { defineConfig } from 'vitest/config';

import { sharedTestConfig } from '../../vitest.shared';

export default defineConfig({
  root: __dirname,
  cacheDir: '/tmp/vitest/nx-ng-starter/libs/backend-interfaces',
  resolve: {
    tsconfigPaths: true,
  },
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
        branches: 83,
        functions: 61,
        lines: 91,
        statements: 88,
      },
    },
    include: ['src/**/*.spec.ts'],
  },
});

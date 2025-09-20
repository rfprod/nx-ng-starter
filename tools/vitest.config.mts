import { defineConfig } from 'vitest/config';

import { sharedTestConfig } from './ts/vitest.shared';

export default defineConfig({
  root: __dirname,
  cacheDir: '/tmp/vitest/nx-ng-starter/tools',
  test: {
    ...sharedTestConfig,
    environment: 'node',
    coverage: {
      enabled: true,
      clean: true,
      reporter: ['text', 'json', 'html', 'json-summary'],
      reportsDirectory: '../dist/coverage/tools',
      provider: 'istanbul',
      thresholds: {
        branches: 34,
        functions: 30,
        lines: 31,
        statements: 31,
      },
    },
    include: ['executors/**/*.spec.ts', 'ts/**/*.spec.ts'],
  },
});

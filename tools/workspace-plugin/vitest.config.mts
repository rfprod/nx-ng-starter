import { defineConfig } from 'vitest/config';

import { sharedTestConfig } from '../ts/vitest.shared';

export default defineConfig({
  root: __dirname,
  cacheDir: '/tmp/vitest/nx-ng-starter/tools/workspace-plugin',
  test: {
    ...sharedTestConfig,
    environment: 'node',
    coverage: {
      enabled: true,
      clean: true,
      reporter: ['text', 'json', 'html', 'json-summary'],
      reportsDirectory: '../../dist/coverage/tools/workspace-plugin',
      provider: 'istanbul',
      thresholds: {
        branches: 43,
        functions: 62,
        lines: 61,
        statements: 60,
      },
    },
    include: ['src/**/*.spec.ts'],
  },
});

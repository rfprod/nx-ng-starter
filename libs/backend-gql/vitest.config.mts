import { defineConfig } from 'vitest/config';

import { sharedTestConfig } from '../../vitest.shared';

export default defineConfig({
  root: __dirname,
  cacheDir: '/tmp/vitest/nx-ng-starter/libs/backend-gql',
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
      reportsDirectory: '../../dist/coverage/libs/backend-gql',
      provider: 'istanbul',
      thresholds: {
        branches: 25,
        functions: 62,
        lines: 71,
        statements: 71,
      },
    },
    include: ['src/**/*.spec.ts'],
  },
});

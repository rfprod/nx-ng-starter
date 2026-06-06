import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vitest/config';

import { sharedTestConfig } from '../../vitest.shared';

export default defineConfig({
  root: __dirname,
  cacheDir: '/tmp/vitest/nx-ng-starter/libs/client-service-worker',
  plugins: [angular()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    ...sharedTestConfig,
    environment: 'jsdom',
    coverage: {
      enabled: true,
      clean: true,
      reporter: ['text', 'json', 'html', 'json-summary'],
      reportsDirectory: '../../dist/coverage/libs/client-service-worker',
      provider: 'istanbul',
      thresholds: {
        branches: 0,
        functions: 0,
        lines: 2,
        statements: 2,
      },
    },
    include: ['src/**/*.spec.ts'],
    setupFiles: 'src/test-setup.ts',
  },
});

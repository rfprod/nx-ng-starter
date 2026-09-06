import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vitest/config';

import { sharedTestConfig } from '../../vitest.shared';

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '/tmp/vitest/nx-ng-starter/libs/client-diagnostics',
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
      reportsDirectory: '../../dist/coverage/libs/client-diagnostics',
      provider: 'istanbul',
      thresholds: {
        branches: 0,
        functions: 20,
        lines: 22,
        statements: 22,
      },
    },
    include: ['src/**/*.spec.ts'],
    setupFiles: 'src/test-setup.ts',
  },
});

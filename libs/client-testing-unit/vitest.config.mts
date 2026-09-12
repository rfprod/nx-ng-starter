import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vitest/config';

import { sharedTestConfig } from '../../vitest.shared.mts';

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '/tmp/vitest/nx-ng-starter/libs/client-testing-unit',
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
      reportsDirectory: '../../dist/coverage/libs/client-testing-unit',
      provider: 'istanbul',
      thresholds: {
        branches: 85,
        functions: 96,
        lines: 97,
        statements: 98,
      },
    },
    include: ['src/**/*.spec.ts'],
    setupFiles: 'src/test-setup.ts',
  },
});

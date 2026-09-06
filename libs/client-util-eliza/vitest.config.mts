import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vitest/config';

import { sharedTestConfig } from '../../vitest.shared';

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '/tmp/vitest/nx-ng-starter/libs/client-util-eliza',
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
      reportsDirectory: '../../dist/coverage/libs/client-util-eliza',
      provider: 'istanbul',
      thresholds: {
        branches: 40,
        functions: 85,
        lines: 60,
        statements: 60,
      },
    },
    include: ['src/**/*.spec.ts'],
    setupFiles: 'src/test-setup.ts',
  },
});

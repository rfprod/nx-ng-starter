import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vitest/config';

import { sharedTestConfig } from '../../vitest.shared';

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '/tmp/vitest/nx-ng-starter/libs/client-chatbot',
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
      reportsDirectory: '../../dist/coverage/libs/client-chatbot',
      provider: 'istanbul',
      thresholds: {
        branches: 64,
        functions: 100,
        lines: 80,
        statements: 80,
      },
    },
    include: ['src/**/*.spec.ts'],
    setupFiles: 'src/test-setup.ts',
  },
});

import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vitest/config';

import { sharedTestConfig } from '../../vitest.shared';

export default defineConfig({
  root: __dirname,
  cacheDir: '/tmp/vitest/nx-ng-starter/libs/client-store-http-progress',
  plugins: [angular(), nxViteTsPaths()],
  test: {
    ...sharedTestConfig,
    environment: 'jsdom',
    coverage: {
      enabled: true,
      clean: true,
      reporter: ['text', 'json', 'html', 'json-summary'],
      reportsDirectory: '../../dist/coverage/libs/client-store-http-progress',
      provider: 'istanbul',
      thresholds: {
        branches: 77,
        functions: 93,
        lines: 98,
        statements: 97,
      },
    },
    include: ['src/**/*.spec.ts'],
    setupFiles: 'src/test-setup.ts',
  },
});

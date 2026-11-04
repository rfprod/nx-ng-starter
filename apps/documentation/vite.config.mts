import angular from '@analogjs/vite-plugin-angular';
import { nxReadySignal } from '@nx/vite/plugins/nx-ready-signal.plugin';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  root: import.meta.dirname,
  cacheDir: '/tmp/vite/nx-ng-starter/apps/documentation',
  plugins: [angular(), nxReadySignal()],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: '../../dist/apps/documentation',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
  },
  define: {
    ['import.meta.vitest']: mode !== 'production',
  },
}));

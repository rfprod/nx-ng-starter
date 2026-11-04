import { nxReadySignal } from '@nx/vite/plugins/nx-ready-signal.plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [nxReadySignal()],
  root: import.meta.dirname,
  cacheDir: '/tmp/vite/nx-ng-starter/tools',
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: '../dist/tools',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
  },
});

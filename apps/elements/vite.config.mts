import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  root: import.meta.dirname,
  cacheDir: '/tmp/vite/nx-ng-starter/apps/elements',
  plugins: [angular()],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: '../../dist/apps/elements',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
  },
  define: {
    ['import.meta.vitest']: mode !== 'production',
  },
}));

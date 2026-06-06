import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  root: __dirname,
  cacheDir: '/tmp/vite/nx-ng-starter/apps/client',
  plugins: [angular()],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: '../../dist/apps/client',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
  },
  define: {
    ['import.meta.vitest']: mode !== 'production',
  },
}));

import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  root: import.meta.dirname,
  cacheDir: '/tmp/vite/nx-ng-starter/libs/client-store-http-api',
  plugins: [angular()],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: '../../dist/libs/client-store-http-api',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
  },
  define: {
    ['import.meta.vitest']: mode !== 'production',
  },
}));

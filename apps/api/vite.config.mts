import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  root: import.meta.dirname,
  cacheDir: '/tmp/vite/nx-ng-starter/apps/api',
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: '../../dist/apps/api',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
  },
  define: {
    ['import.meta.vitest']: mode !== 'production',
  },
}));

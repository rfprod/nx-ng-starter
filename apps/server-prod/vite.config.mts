import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  root: __dirname,
  cacheDir: '/tmp/vite/nx-ng-starter/apps/server-prod',
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: '../../dist/apps/server-prod',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
  },
  define: {
    ['import.meta.vitest']: mode !== 'production',
  },
}));

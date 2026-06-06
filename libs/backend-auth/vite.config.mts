import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  root: __dirname,
  cacheDir: '/tmp/vite/nx-ng-starter/libs/backend-auth',
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: '../../dist/libs/backend-auth',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
  },
  define: {
    ['import.meta.vitest']: mode !== 'production',
  },
}));

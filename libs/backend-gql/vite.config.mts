import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  root: __dirname,
  cacheDir: '/tmp/vite/nx-ng-starter/libs/backend-gql',
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: '../../dist/libs/backend-gql',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
  },
  define: {
    ['import.meta.vitest']: mode !== 'production',
  },
}));

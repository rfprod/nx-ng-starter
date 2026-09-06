import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  root: import.meta.dirname,
  cacheDir: '/tmp/vite/nx-ng-starter/libs/backend-interfaces',
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: '../../dist/libs/backend-interfaces',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
  },
  define: {
    ['import.meta.vitest']: mode !== 'production',
  },
}));

import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
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

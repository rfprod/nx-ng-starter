import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  cacheDir: '/tmp/vite/nx-ng-starter/tools/workspace-plugin',
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: '../../dist/tools/workspace-plugin',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
  },
});

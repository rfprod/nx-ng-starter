import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  root: import.meta.dirname,
  cacheDir: '/tmp/vite/nx-ng-starter/libs/client-util-eliza',
  plugins: [angular()],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: '../../dist/libs/client-util-eliza',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
  },
  define: {
    ['import.meta.vitest']: mode !== 'production',
  },
}));

const esbuildPluginTsc = require('esbuild-plugin-tsc');
const fileReplacementPlugin = require('../../tools/js/esbuild/file-replacement-plugin');
const copyAssetsPlugin = require('../../tools/js/esbuild/copy-assets-plugin');
const { join } = require('node:path');

module.exports = {
  sourcemap: true,
  plugins: [
    fileReplacementPlugin(
      {
        'environments/environment': 'environments/environment.prod.ts',
      },
      join(process.cwd(), '/apps/api/src'),
    ),
    copyAssetsPlugin(
      [
        { src: 'node_modules/swagger-ui-dist', dest: 'swagger-ui-dist' },
        { src: 'apps/api/src/assets', dest: 'assets' },
      ],
      process.cwd(),
      'dist/apps/api',
    ),
    esbuildPluginTsc({
      tsconfigPath: 'apps/api/tsconfig.app.json',
    }),
  ],
  outExtension: {
    '.js': '.js',
  },
};

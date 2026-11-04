const esbuildPluginTsc = require('esbuild-plugin-tsc');
const copyAssetsPlugin = require('../../tools/js/esbuild/copy-assets-plugin');

module.exports = {
  sourcemap: true,
  plugins: [
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

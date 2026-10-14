const esbuildPluginTsc = require('esbuild-plugin-tsc');
const fileReplacementPlugin = require('../../tools/js/esbuild/file-replacement-plugin');
const { join } = require('node:path');

module.exports = {
  sourcemap: true,
  plugins: [
    fileReplacementPlugin(
      {
        'environments/environment': 'environments/environment.prod.ts',
      },
      join(process.cwd(), '/apps/server-prod/src'),
    ),
    esbuildPluginTsc({
      tsconfigPath: 'apps/server-prod/tsconfig.app.json',
    }),
  ],
  outExtension: {
    '.js': '.js',
  },
};

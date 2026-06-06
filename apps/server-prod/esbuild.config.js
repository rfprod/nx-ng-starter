const esbuildPluginTsc = require('esbuild-plugin-tsc');

module.exports = {
  sourcemap: true,
  plugins: [
    esbuildPluginTsc({
      tsconfigPath: 'apps/server-prod/tsconfig.app.json',
    }),
  ],
  outExtension: {
    '.js': '.js',
  },
};

const esbuildPluginTsc = require('esbuild-plugin-tsc');

module.exports = {
  sourcemap: true,
  plugins: [
    esbuildPluginTsc({
      tsconfigPath: 'apps/api/tsconfig.app.json',
    }),
  ],
  outExtension: {
    '.js': '.js',
  },
};

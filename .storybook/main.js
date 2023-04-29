const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  core: {
    disableTelemetry: true,
  },
  addons: [{ name: '@storybook/addon-controls' }],
  features: {
    postcss: true,
  },
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  plugins: [
    require('autoprefixer')({
      flexbox: 'no-2009',
    }),
  ],
  stories: [],
  webpackFinal: async config => {
    const tsPaths = new TsconfigPathsPlugin({
      configFile: './tsconfig.base.json',
    });
    config.resolve.plugins ? config.resolve.plugins.push(tsPaths) : (config.resolve.plugins = [tsPaths]);

    // add your own webpack tweaks below if needed

    /**
     * Remove html raw loader that breaks Jit compilation as suggested here https://github.com/storybookjs/storybook/issues/16977#issuecomment-1004059631.
     * The issue references:
     * - https://github.com/storybookjs/storybook/issues/16977#issuecomment-1003399336
     * - https://github.com/storybookjs/storybook/issues/16977#issuecomment-1004180729
     * Here's what should be removed:
     * {
     *   test: /\.html$/,
     *   loader: './node_modules/raw-loader/dist/cjs.js',
     *   exclude: /\.async\.html$/
     * },
     */
    const rules = (config.module.rules ?? []).filter(rule => !rule.loader?.includes('raw-loader'));
    config.module.rules = [...rules];

    // adjust file size limits, see docs here https://webpack.js.org/configuration/performance/#performance-maxentrypointsize
    config.performance.maxEntrypointSize = 512000;
    config.performance.maxAssetSize = 512000;

    // add your own webpack tweaks above if needed

    return config;
  },
};

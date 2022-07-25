const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  addons: [
    {
      name: '@storybook/addon-links',
    },
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: true,
        backgrounds: true,
        controls: true,
        docs: false,
        viewport: true,
        toolbars: true,
      },
    },
  ],
  features: {
    postcss: true,
  },
  framework: '@storybook/angular',
  plugins: [
    require('postcss-flexbugs-fixes'),
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
    const rules = (config.module.rules ?? []).filter(
      rule => rule.test !== /\.html$/ && rule.exclude !== /\.async\.html$/ && !rule.loader?.includes('raw-loader'),
    );
    config.module.rules = [...rules];

    // adjust file size limits, see docs here https://webpack.js.org/configuration/performance/#performance-maxentrypointsize
    config.performance.maxEntrypointSize = 512000;
    config.performance.maxAssetSize = 512000;

    // add your own webpack tweaks above if needed

    return config;
  },
};

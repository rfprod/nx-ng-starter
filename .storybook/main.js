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
        "actions": true,
        "backgrounds": true,
        "controls": true,
        "docs": false,
        "viewport": true,
        "toolbars": true,
      }
    }
  ],
  features: {
    postcss: true,
  },
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('autoprefixer')({
      flexbox: 'no-2009',
    }),
  ],
  stories: [],
  webpackFinal: async (config) => {
    // for backwards compatibility call the `rootWebpackConfig`
    // this can be removed once that one is migrated fully to
    // use the `webpackFinal` property in the `main.js` file
    const tsPaths = new TsconfigPathsPlugin({
      configFile: './tsconfig.base.json',
    });

    config.resolve.plugins
      ? config.resolve.plugins.push(tsPaths)
      : (config.resolve.plugins = [tsPaths]);

    // add your own webpack tweaks if needed

    return config;
  },
};

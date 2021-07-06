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
        "docs": true,
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
  stories: []
};

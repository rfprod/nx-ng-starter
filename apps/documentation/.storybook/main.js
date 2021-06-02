module.exports = {
  core: {
    builder: 'webpack5',
  },
  addons: ['@storybook/addon-docs', '@storybook/addon-controls', '@storybook/addon-actions'],
  features: {
    postcss: true,
  },
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('autoprefixer')({
      flexbox: 'no-2009',
    }),
  ],
};

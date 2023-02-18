const rootMain = require('../../../.storybook/main');

module.exports = {
  ...rootMain,
  stories: ['../src/lib/**/*.stories.ts'],
};

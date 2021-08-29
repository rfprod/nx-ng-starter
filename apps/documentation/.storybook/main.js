const rootMain = require('../../../.storybook/main');

module.exports = {
  ...rootMain,
  stories: ['../../../libs/**/src/lib/**/*.stories.ts']
};

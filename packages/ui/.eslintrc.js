const getConfig = require("@crab-stash/linting/eslint-preset");
const config = getConfig(true);
module.exports = {
  ...config,
  extends: [...config.extends, "plugin:storybook/recommended"],
};

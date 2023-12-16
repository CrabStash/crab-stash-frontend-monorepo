const getConfig = require("@crab-stash/linting/eslint-preset");

module.exports = {
  ...getConfig(),

  overrides: [
    {
      files: ["*"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};

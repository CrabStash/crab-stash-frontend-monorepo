module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "react-hooks"],
  "env": {
      "node": true,
      "browser": true,
      "amd": true
  },
  "extends": [
      "eslint:recommended",
      "plugin:@next/next/recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended"
  ],
};

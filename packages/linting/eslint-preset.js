const getConfig = (withoutNext = false) => {
  /** @type {import("eslint").Linter.Config} */
  return {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "react-hooks", "simple-import-sort"],
    env: {
      es6: true,
      browser: true,
      jest: true,
      node: true,
    },
    extends: [
      "eslint:recommended",
      withoutNext ? "" : "plugin:@next/next/recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
    ],
    rules: {
      "react/react-in-jsx-scope": 0,
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "simple-import-sort/imports": [
        2,
        {
          groups: [
            ["^\\u0000"], // Side effects.
            ["react"], // Packages from node_modules. React-related packages will be first.
            ["^next"], // Packages from node_modules. Next-related packages will be second.
            ["^@/crab-stash"], // Imports from other packages/apps
            ["^@/"], // Absolute imports
            ["^\\."], // Relative imports.
          ],
        },
      ],
      "padding-line-between-statements": [
        2,
        // Always require blank lines before return statements.
        { blankLine: "always", prev: "*", next: "return" },

        // Always require blank lines before and after class declaration, if, switch, try.
        {
          blankLine: "always",
          prev: "*",
          next: ["if", "class", "for", "switch", "try"],
        },
        {
          blankLine: "always",
          prev: ["if", "class", "for", "switch", "try"],
          next: "*",
        },

        // Always require blank lines before and after every sequence of variable declarations and export.
        {
          blankLine: "always",
          prev: "*",
          next: ["const", "let", "var", "export"],
        },
        {
          blankLine: "always",
          prev: ["const", "let", "var", "export"],
          next: "*",
        },
        {
          blankLine: "any",
          prev: ["const", "let", "var", "export"],
          next: ["const", "let", "var", "export"],
        },
      ],
      "@typescript-eslint/typedef": [
        "error",
        {
          parameter: true,
        },
      ],
      "@typescript-eslint/consistent-type-imports": "warn",
      "@typescript-eslint/ban-ts-comment": "off",
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  };
};
module.exports = getConfig;

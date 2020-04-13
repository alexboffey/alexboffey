module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:react/recommended",
  ],
  // parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "import",
    "json",
    "simple-import-sort",
    "react",
    "react-hooks",
  ],
  settings: { react: { version: "detect" } },
  rules: {
    "import/order": "off",
    "simple-import-sort/sort": "error",
    "sort-imports": "off",
  },
  overrides: [
    {
      files: ["*.test.ts", ".test.tsx"],
      rules: {
        "react/display-name": "off",
      },
    },
  ],
};

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:react/recommended",
  ],
  parser: "@typescript-eslint/parser",
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
    "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      { accessibility: "no-public" },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-parameter-properties": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { ignoreRestSiblings: true },
    ],
    "import/order": "off",
    "simple-import-sort/sort": "error",
    "sort-imports": "off",
    "react/prop-types": "off",
  },
  overrides: [
    {
      files: ["*.test.ts", ".test.tsx"],
      rules: {
        "react/display-name": "off",
      },
    },
    {
      // Allow tool configurations to require("module-name")
      files: ["*.config.js", "*-config.js", "*-node.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
  env: {
    node: true,
  },
}

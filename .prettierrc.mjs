/** @type {import("prettier").Config} */
export default {
  semi: false,
  trailingComma: "all",
  plugins: ["prettier-plugin-astro"],
  overrides: [{ files: "*.astro", options: { parser: "astro" } }],
}

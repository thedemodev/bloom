module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    project: [
      "./tsconfig.json",
      "./apps/public-reference/tsconfig.json",
      "./services/**/tsconfig.json"
    ],
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    tsconfigRootDir: "."
  },
  plugins: ["react", "@typescript-eslint"],
  extends: [
    "eslint:recommended", // the set of rules which are recommended for all projects by the ESLint Team
    "plugin:@typescript-eslint/eslint-recommended", // conflict resolution between above and below rulesets.
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:@typescript-eslint/recommended-requiring-type-checking", // additional rules that take a little longer to run
    "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    "plugin:mdx/recommended" // Enables linting for MDX files
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "react/jsx-uses-vars": "warn",
    "react/jsx-uses-react": "warn"
  }
}

// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    "universe",
    "universe/shared/typescript-analysis",
    "universe/native",
    "prettier",
  ],
  plugins: ["prettier", "import", "unused-imports"],
  rules: {
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "object",
          "type",
          "index",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: "@/features/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/components/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/hooks/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/lib/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/constants/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/types/**",
            group: "internal",
            position: "before",
          },
        ],
      },
    ],
    "prettier/prettier": "error",
    "react-native/no-inline-styles": 0,
    "import/namespace": 0,
    "no-duplicate-imports": "error",
    "unused-imports/no-unused-imports": "error",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.d.ts"],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: { project: "./" },
      alias: {
        extensions: [".ts", ".tsx"],
        map: [["@/", "./src"]],
      },
    },
  },
};

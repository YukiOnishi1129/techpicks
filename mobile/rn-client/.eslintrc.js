// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["universe", "prettier", "universe/shared/typescript-analysis"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.d.ts"],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
};

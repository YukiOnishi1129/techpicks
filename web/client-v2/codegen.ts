import { type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../../bff/apollo-gateway/src/schema/**/*.graphql",
  documents: ["./src/**/*.tsx", "./src/**/*.ts", "!node_modules/"],
  generates: {
    "src/graphql/type.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;

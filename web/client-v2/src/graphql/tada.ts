import { initGraphQLTada } from "gql.tada";

import type { introspection } from "./graphql-env.d.ts";

export const graphql = initGraphQLTada<{
  introspection: introspection;
  scalars: {
    URL: string;
    Timestamp: number;
  };
}>();

export { maskFragments, readFragment } from "gql.tada";
export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";

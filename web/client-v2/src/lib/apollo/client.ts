import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

export const { getClient } = registerApolloClient(() => {
  const graphqlUrl = process.env.BFF_API_URL || "http://localhost:3000";
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${graphqlUrl}/graphql`,
      fetchOptions: { cache: "no-store" },
    }),
  });
});

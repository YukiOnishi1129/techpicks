import { HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

import { getSession } from "@/features/auth/actions/auth";

const graphqlUrl = process.env.BFF_API_URL || "http://localhost:3000";

const httpLink = new HttpLink({
  uri: `${graphqlUrl}/graphql`,
  fetchOptions: { cache: "no-store" },
});

const authLink = setContext(async (_, { headers }) => {
  const { data: session } = await getSession();

  const token = session.session?.access_token;

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
});

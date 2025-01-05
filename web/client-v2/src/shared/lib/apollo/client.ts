import { ApolloLink, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

import { getSession } from "@/features/auth/actions/auth";

const graphqlUrl = process.env.BFF_API_URL || "";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri: `${graphqlUrl}/graphql`,
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

export const { getClient, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([errorLink, authLink, httpLink]),
  });
});

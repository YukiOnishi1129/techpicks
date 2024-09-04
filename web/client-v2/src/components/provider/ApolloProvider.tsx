"use client";

import { HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

import { getSession } from "@/features/auth/actions/auth";

function makeClient() {
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
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
}

export function ApolloProvider({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}

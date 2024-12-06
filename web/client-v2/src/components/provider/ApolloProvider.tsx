"use client";

import { HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

import { getSession } from "@/features/auth/actions/auth";

function makeClient() {
  const graphqlUrl =
    process.env.NEXT_PUBLIC_BFF_API_URL || "http://localhost:3000";
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
  const [client, setClient] = useState<ApolloClient<unknown> | null>(null);

  useEffect(() => {
    const clientInstance = makeClient();
    setClient(clientInstance);
  }, []);

  if (!client) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <BeatLoader color="#36d7b7" className="inline-block" />
      </div>
    );
  }

  return (
    <ApolloNextAppProvider makeClient={() => client}>
      {children}
    </ApolloNextAppProvider>
  );
}

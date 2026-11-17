import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export function getStaticApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri:
        process.env.GRAPHQL_URL ??
        process.env.NEXT_PUBLIC_GRAPHQL_URL ??
        process.env.NEXT_PUBLIC_ERXES_ENDPOINT ??
        "/graphql",
      headers: {
        "x-app-token": process.env.ERXES_APP_TOKEN ?? process.env.NEXT_PUBLIC_ERXES_APP_TOKEN ?? "",
      },
      fetchOptions: { next: { revalidate: 60 } },
    }),
    cache: new InMemoryCache(),
  });
}

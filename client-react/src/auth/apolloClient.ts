import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import result from "../generated/possibleTypes";
import { API_ENPOINT } from "../assets/env-variables";

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// http link with Content-Type header
const httpLink = new HttpLink({
  uri: API_ENPOINT,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});

//client configuration
export const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(result),
  connectToDevTools: true //for chrome dev tools
});

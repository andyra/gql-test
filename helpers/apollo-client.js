import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://www.office.tes.fm/api",
  cache: new InMemoryCache(),
});

export default client;

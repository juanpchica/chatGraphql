import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

export default function ApolloProvider(props) {
  return <ApolloProvider client={client} {...props} />;
}

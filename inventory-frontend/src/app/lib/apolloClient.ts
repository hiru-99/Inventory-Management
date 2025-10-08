'use client';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL || '/graphql';

const client = new ApolloClient({
  link: new HttpLink({
    uri: graphqlUrl,
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;

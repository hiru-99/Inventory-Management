import { HttpLink } from '@apollo/client';
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
const client = new ApolloClient({
  link: new HttpLink({uri:'http://localhost:3000/graphql'}),
  // link: process.env.NEXT_PUBLIC_GRAPHQL || 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

export default client;

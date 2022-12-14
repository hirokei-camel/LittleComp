import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import Cookies from 'cookies-ts';

const cache = new InMemoryCache();
const uri =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000/graphql';

const httpLink = new HttpLink({
  uri,
  credentials: 'include',
});

const authLink = new ApolloLink((operation: any, forward: any) => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  return forward(operation);
});

export const graphqlClient = new ApolloClient({
  // Todo: Replace new uri using environment variable when deploying
  link: authLink.concat(httpLink),
  cache,
});

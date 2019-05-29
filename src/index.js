import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

import * as serviceWorker from './serviceWorker';
import App from './App';

import './style.css';

// import introspectionResult from '../introspection-result';

// const fragmentMatcher = new IntrospectionFragmentMatcher({
//   introspectionQueryResultData: introspectionResult,
// });

// const cache = new InMemoryCache({
//   fragmentMatcher,
// });

const cache = new InMemoryCache();

const MOVIE_BASE_URL = 'https://112qaej5y9.execute-api.ap-southeast-2.amazonaws.com/dev/graphql';

const httpLink = new HttpLink({
  uri: MOVIE_BASE_URL,
  headers: {
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

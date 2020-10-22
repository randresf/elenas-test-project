import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/react-hooks'
import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import { isLoged } from './utils/isLoged';
import Routes from './Routes';

const client = new ApolloClient({
  uri: 'http://staging.athenea.elenas.la/gql/',
  cache: new InMemoryCache(),
  headers:
    isLoged()
      ? { authorization: `Token ${localStorage.getItem('token')!}` }
      : undefined
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <CSSReset />
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import CarList from './components/CarList';
import { ApolloProvider } from '@apollo/client/react';

//Setting up client
const client = new ApolloClient({
  uri: 'http://localhost:4200/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id='main'>
        <h1>CAR-DB</h1>
        <CarList />
      </div>
    </ApolloProvider>
  );
}

export default App;

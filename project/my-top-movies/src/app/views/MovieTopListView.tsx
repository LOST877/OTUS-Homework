'use client'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import MovieTopListContainer from '../containers/MovieTopListContainer';

const MovieTopListView = () => {
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <div className="py-3">
        <MovieTopListContainer />
      </div>
    </ApolloProvider>
  );
}

export default MovieTopListView;
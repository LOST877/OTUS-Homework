'use client'
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { MoviesState } from "../types";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

export const defaultContext: MoviesState = {
  loading: false,
  error: null,
  movies: [],
};

export const MoviesContext = createContext({
  movies: defaultContext,
  setMovies: useState as Dispatch<SetStateAction<MoviesState>>,
});

export default function MoviesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [movies, setMovies] = useState(defaultContext);
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
  });
  client
    .query({
      query: gql`
        query GetMovies {
          movies {
            rate
            imdbid
            poster
            title
            type
            year
            id
          }
        }
      `,
    })
    .then((result) => console.log(result));
  return (
    <MoviesContext.Provider value={{ movies, setMovies }}>
      {children}
    </MoviesContext.Provider>
  );
}

'use client'
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { MoviesState } from "../types";
import {
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";

export const defaultContext: MoviesState = {
  loading: true,
  error: null,
  movies: [],
};

export const MoviesTopContext = createContext({
  movies: defaultContext,
  setMovies: useState as Dispatch<SetStateAction<MoviesState>>,
});

export default function MoviesTopProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [movies, setMovies] = useState(defaultContext);
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
  });
  useEffect(() => {
    client
      .query({
        query: gql`
          query GetMovies {
            movies {
              imdbID
              Poster
              Title
              Type
              Year
              id
              Rate
            }
          }
        `,
      })
      .then(({ data }) => {
        setMovies({
          loading: false,
          error: null,
          movies: data.movies,
        })
      }
      );
  }, []);
  return (
    <MoviesTopContext.Provider value={{ movies, setMovies }}>
      {children}
    </MoviesTopContext.Provider>
  );
}

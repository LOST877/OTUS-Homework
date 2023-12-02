'use client'
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { MoviesState } from "../types";

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
  return (
    <MoviesContext.Provider value={{ movies, setMovies }}>
      {children}
    </MoviesContext.Provider>
  );
}

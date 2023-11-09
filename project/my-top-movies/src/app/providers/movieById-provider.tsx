'use client'
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Movie, MovieState } from "../types";

const defaultStateMovie: Movie = {
  Actors: "",
  Awards: "",
  BoxOffice: "",
  Country: "",
  DVD: "",
  Director: "",
  Genre: "",
  Language: "",
  Metascore: "",
  Plot: "",
  Poster: "",
  Production: "",
  Rated: "",
  Ratings: [{ Source: "", Value: "" }],
  Released: "",
  Runtime: "",
  Title: "",
  Type: "",
  Website: "",
  Writer: "",
  Year: "",
  imdbID: "",
  imdbRating: "",
  imdbVotes: "",
};

const defaultContext: MovieState = {
  loading: false,
  error: null,
  movie: defaultStateMovie,
};

export const MovieByIdContext = createContext({
  movieById: defaultContext,
  setMovieById: useState as Dispatch<SetStateAction<MovieState>>,
});

export default function MovieByIdProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [movieById, setMovieById] = useState(defaultContext);
  return (
    <MovieByIdContext.Provider value={{ movieById, setMovieById }}>
      {children}
    </MovieByIdContext.Provider>
  );
}

import { gql } from "@apollo/client";

export const GET_MOVIE = gql`
  query MovieByImdbid($imdbID: String!) {
    movieByImdbid(imdbID: $imdbID) {
      id
      Rate
    }
  }
`;
export const GET_MOVIES = gql`
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
`;
export const ADD_MOVIE = gql`
  mutation AddMovie($content: AddMovieInput!) {
    AddMovie(content: $content) {
      Title
      imdbID
      Rate
      Year
      Type
      Poster
    }
  }
`;
export const DELETE_MOVIE = gql`
  mutation DeleteMovie($id: Int!) {
    DeleteMovie(id: $id) {
      Title
    }
  }
`;

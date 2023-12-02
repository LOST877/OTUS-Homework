export interface MovieShort {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
  Rate?: number;
  id?: number;
}

export interface MovieTopShort extends MovieShort {
  id: number;
}

export interface MovieState {
  loading: boolean;
  error: Error | null;
  movie: Movie;
}

export interface MoviesState {
  loading: boolean;
  error: Error | null;
  movies: Array<MovieShort>;
}

export interface Movie extends MovieShort {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Production: string;
  Rated: string;
  Ratings: [{Source: string, Value: string}];
  Released: string;
  Runtime: string;
  Website: string;
  Writer: string;
  imdbRating: string;
  imdbVotes: string;
}

 export interface OmdbSuccessResponse {
   Response: "True";
 }

 export interface OmdbErrorResponse {
   Response: "False";
   Error: string;
 }

 export interface OmdbGetByIdResponse extends OmdbSuccessResponse, Movie {}

 export interface OmdbSearchResponse extends OmdbSuccessResponse {
   Search: Array<MovieShort>;
   totalResults: string;
 }

 export enum Routes {
  TOP,
  SEARCH,
 }
 
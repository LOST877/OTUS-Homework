import { useContext } from 'react';
import SearchForm from '../components/SearchForm/SearchForm'
import { MoviesContext } from '../providers/movies-provider';
import { OmdbSearchResponse } from '../types';
import { getByName } from '../utils';

const SearchFormContainer = () => {
  const { movies, setMovies } = useContext(MoviesContext);
  const searchMovies = (query: string) => {
    setMovies({
      loading: true,
      error: null,
      movies: movies.movies
    });
    const get: Promise<OmdbSearchResponse> = getByName<OmdbSearchResponse>({
      params: { query, page: 1 },
    });
    return get
      .then((response) => {
        setMovies({
          loading: false,
          error: null,
          movies: response.Search,
        });
      })
      .catch((error) => {
        setMovies({
          loading: false,
          error: error,
          movies: movies.movies,
        });
      });
  };

  return(
    <SearchForm onSearch={searchMovies}/>
  );
}

export default SearchFormContainer;

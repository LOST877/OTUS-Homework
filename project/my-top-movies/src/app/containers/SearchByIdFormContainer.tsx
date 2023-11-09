import { useContext } from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import { getById } from '../details/[imdbID]/api/route';
import { MovieByIdContext } from '../providers/movieById-provider';
import { OmdbGetByIdResponse } from '../types';

const SearchByIdFormContainer = ({
  params,
}: {
  params: { imdbID: string };
}) => {
  const { movieById, setMovieById } = useContext(MovieByIdContext);
  const searchMovieById = (imdbID: string) => {
    setMovieById({
      loading: true,
      error: null,
      movie: movieById.movie,
    });
    return getById<OmdbGetByIdResponse>({ params })
      .then((response) => {
        setMovieById({
          loading: false,
          error: null,
          movie: response,
        });
      })
      .catch((error) => {
        setMovieById({
          loading: false,
          error: error,
          movie: movieById.movie,
        });
      });
  };

  return <SearchForm onSearch={searchMovieById} imdbID={params.imdbID} />;
};

export default SearchByIdFormContainer;

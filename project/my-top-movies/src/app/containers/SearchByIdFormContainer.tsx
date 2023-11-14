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
  const searchMovieById = async (imdbID: string) => {
    setMovieById({
      loading: true,
      error: null,
      movie: movieById.movie,
    });
    try {
      const response = await getById<OmdbGetByIdResponse>({ params });
      setMovieById({
        loading: false,
        error: null,
        movie: response,
      });
    } catch(error) {
      setMovieById({
        loading: false,
        error: error as Error,
        movie: movieById.movie,
      });
    }
  };

  return <SearchForm onSearch={searchMovieById} imdbID={params.imdbID} />;
};

export default SearchByIdFormContainer;

import { useContext, useEffect } from 'react';
import { getById } from '../details/[imdbID]/api/route';
import { MovieByIdContext } from '../providers/movieById-provider';
import { OmdbGetByIdResponse } from '../types';

interface Props {
  imdbID: string;
}

const SearchByIdFormContainer = (props: Props) => {
  const { movieById, setMovieById } = useContext(MovieByIdContext);
  const { imdbID } = props;
  const searchMovieById = async (imdbID: string) => {
    setMovieById({
      loading: true,
      error: null,
      movie: movieById.movie,
    });
    try {
      const response = await getById<OmdbGetByIdResponse>(imdbID);
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
  useEffect(() => {
    if (imdbID) searchMovieById(imdbID);
  }, []);

  return <></>;
};

export default SearchByIdFormContainer;

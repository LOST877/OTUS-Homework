'use client'
import SearchFormContainer from '../containers/SearchFormContainer';
import InfoBlock from '../components/InfoBlock/InfoBlock';
import { useContext } from 'react';
import MovieList from '../components/MovieList/MovieList';
import { MoviesTopContext } from '../providers/moviesTop-provider';

const MovieTopListView = () => {
  const { movies } = useContext(MoviesTopContext);
  return (
    <>
      <div className="py-3">
        {(movies.error || movies.loading) && (
          <InfoBlock loading={movies.loading} error={movies.error} />
        )}
        {!movies.error && !movies.loading && (
          <MovieList movies={movies.movies} />
        )}
      </div>
    </>
  );
}

export default MovieTopListView;
'use client'
import SearchFormContainer from '../containers/SearchFormContainer';
import InfoBlock from '../components/InfoBlock/InfoBlock';
import { useContext } from 'react';
import { MoviesContext } from '../providers/movies-provider';
import MovieList from '../components/MovieList/MovieList';

const MovieListView = () => {
  const { movies } = useContext(MoviesContext);
  return(
    <>
      <div className="row py-3">
        <div className="col">
          <SearchFormContainer />
        </div>
      </div>
      {(movies.error || movies.loading) && <InfoBlock loading={movies.loading} error={movies.error} />}
      {(!movies.error && !movies.loading) && <MovieList movies={movies.movies} />}
    </>
  )
}

export default MovieListView;
import { MovieShort } from '../../types/index';
import MovieCard from '../MovieCard/MovieCard';

interface Props {
  movies: Array<MovieShort>;
}

const MovieList = (props: Props) => {
  return (
    <div className="row row-cols-2 row-cols-md-3 g-3">
      {props.movies.map((item) => {
        return (
          <div key={item.imdbID} className="col">
            <MovieCard movie={item} />
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;

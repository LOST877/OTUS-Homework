import { MovieShort } from '../../types/index';
import MovieCard from '../MovieCard/MovieCard';

interface Props {
  movies: Array<MovieShort>;
}

const MovieList = ({ movies }: Props) => {
  return (
    <div className="row row-cols-2 row-cols-md-3 g-3">
      {movies.map((item) => {
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

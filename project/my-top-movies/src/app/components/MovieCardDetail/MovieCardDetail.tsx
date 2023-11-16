
import { useContext } from 'react';
import { MovieByIdContext } from '../../providers/movieById-provider';
import { Movie } from '../../types/index';
import styles from './MovieCardDetail.module.css';

const MovieCardDetail = () => {
  const { movieById } = useContext(MovieByIdContext);
  const { movie } = movieById;
  return(
    <>
      {movie.imdbID &&
      <>
        <div className={styles.movieCardDetail}>
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="card-img-top"
          />
          <div className="card-body mt-3">
            <h5 className="card-title">{movie.Title}</h5>
            <p className="card-text">{movie.Year}</p>
            <p className="card-text">{movie.Plot}</p>
          </div>
        </div>
        </>
      }
    </>
  );
}

export default MovieCardDetail;

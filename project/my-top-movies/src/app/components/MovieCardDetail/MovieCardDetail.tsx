
import { Movie } from '../../types/index';
import styles from './MovieCardDetail.module.css';

interface Props {
  movie: Movie;
}

const MovieCardDetail = (props: Props) => (
  <>
    {props.movie.imdbID &&
    <>
      <div className={styles.movieCardDetail}>
        <img
          src={props.movie.Poster}
          alt={props.movie.Title}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{props.movie.Title}</h5>
          <p className="card-text">{props.movie.Year}</p>
          <p className="card-text">{props.movie.Plot}</p>
        </div>
      </div>
      </>
    }
  </>
);

export default MovieCardDetail;

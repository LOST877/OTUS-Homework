import Link from "next/link";
import { MovieShort } from "../../types/index";

interface Props {
  movie: MovieShort;
}

const MovieCard = (props: Props) => (
  <div className="card">
    <img
      src={props.movie.Poster}
      alt={props.movie.Title}
      className="card-img-top"
    />
    <div className="card-body">
      <h5 className="card-title">{props.movie.Title}</h5>
      <p className="card-text">{props.movie.Year}</p>
      {props.movie.Rate &&
        <p className="card-text">{props.movie.Rate} in top</p>
      }
      <Link
        href={{
          pathname: `/details/${props.movie.imdbID}`,
        }}
        className="btn btn-primary"
      >
        View Details
      </Link>
    </div>
  </div>
);

export default MovieCard;

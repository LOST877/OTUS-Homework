import Link from "next/link";
import { MovieShort } from "../../types/index";

interface Props {
  movie: MovieShort;
}

const MovieCard = ({ movie }: Props) => (
  <div className="card justify-content-between h-100">
    <img src={movie.Poster} alt={movie.Title} className="card-img-top" />
    <div className="card-body flex-grow-0">
      <h5 className="card-title">{movie.Title}</h5>
      <p className="card-text">{movie.Year}</p>
      {movie.Rate && <p className="card-text">{movie.Rate} in top</p>}
      <Link
        href={{
          pathname: `/details/${movie.imdbID}`,
        }}
        className="btn btn-primary"
      >
        View Details
      </Link>
    </div>
  </div>
);

export default MovieCard;

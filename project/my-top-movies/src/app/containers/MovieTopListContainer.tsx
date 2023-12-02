import { useQuery } from "@apollo/client";
import InfoBlock from "../components/InfoBlock/InfoBlock";
import MovieList from "../components/MovieList/MovieList";
import { GET_MOVIES } from "../constants";

const MovieTopListContainer = () => {
    const { data, loading, error } = useQuery(GET_MOVIES);
  return (
    <>
      <InfoBlock loading={loading} error={error as Error} />
      {!error && !loading && <MovieList movies={data.movies} />}
    </>
  );
}

export default MovieTopListContainer;
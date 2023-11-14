import { gql, useQuery } from "@apollo/client";
import { useContext } from "react";
import AddForm from "../components/AddForm/AddForm";
import DeleteButton from "../components/DeleteButton/DeleteButton";
import MovieCardDetail from "../components/MovieCardDetail/MovieCardDetail";
import { MovieByIdContext } from "../providers/movieById-provider";

const MovieCardContainer = ({
  params,
}: {
  params: { imdbID: string };
}) => {
  const { movieById } = useContext(MovieByIdContext);
  const GET_MOVIE = gql`
    query MovieByImdbid($imdbID: String!) {
      movieByImdbid(imdbID: $imdbID) {
        id
        Rate
      }
    }
  `;
  const { data, loading, error } = useQuery(GET_MOVIE, {
    variables: { imdbID: params.imdbID },
  });
  const deleteMovie = () => {
    console.log(data.movieByImdbid[0].id);
  }
  return (
    <>
      {!movieById.loading && !movieById.error && (
        <>
          <MovieCardDetail movie={movieById.movie} />
          {!loading && !error && data?.movieByImdbid[0]?.Rate && (
            <>
              <div className="row py-3">
                <p className="card-text w-auto mx-auto">
                  {data?.movieByImdbid[0]?.Rate} in top
                </p>
              </div>
              <div className="row pb-3">
                <DeleteButton onDelete={deleteMovie} />
              </div>
            </>
          )}
          {!loading && !data?.movieByImdbid[0]?.Rate && (
            <div className="row py-3">
              <AddForm />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default MovieCardContainer;
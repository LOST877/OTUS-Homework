import { useMutation } from "@apollo/client";
import DeleteButton from "../components/DeleteButton/DeleteButton";
import InfoBlock from "../components/InfoBlock/InfoBlock";
import { DELETE_MOVIE, GET_MOVIE } from "../constants";

interface Params {
  movieId: number
}

const DeleteMovieContainer = ({ movieId }: Params) => {
  const [deleteMovie, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_MOVIE, {
      refetchQueries: [GET_MOVIE, "MovieByImdbid"],
    });
  const onDelete = () => {
    deleteMovie({
      variables: {
        id: movieId,
      },
    });
  };
  return (
    <>
      <InfoBlock loading={deleteLoading} error={deleteError as Error} />
      {!deleteLoading && !deleteError && (
        <div className="row pb-3">
          <DeleteButton onDelete={onDelete} />
        </div>
      )}
    </>
  );
}

export default DeleteMovieContainer;
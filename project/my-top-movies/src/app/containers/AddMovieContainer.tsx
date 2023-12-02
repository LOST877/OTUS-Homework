import { useMutation } from "@apollo/client";
import { useContext } from "react";
import AddForm from "../components/AddForm/AddForm";
import InfoBlock from "../components/InfoBlock/InfoBlock";
import { ADD_MOVIE, GET_MOVIE } from "../constants";
import { MovieByIdContext } from "../providers/movieById-provider";

interface Props {
  isMovieInTop: boolean;
}

const AddMovieContainer = ({ isMovieInTop }: Props) => {
  const { movieById } = useContext(MovieByIdContext);
  const [addMovie, { loading: addLoading, error: addError }] = useMutation(
    ADD_MOVIE,
    {
      refetchQueries: [GET_MOVIE, "MovieByImdbid"],
    }
  );
  const onAdd = (input: HTMLInputElement) => {
    const { imdbID, Year, Type, Title, Poster } = movieById.movie;
    addMovie({
      variables: {
        content: {
          Rate: input.value ? +input.value : null,
          Title,
          imdbID,
          Year,
          Type,
          Poster,
        },
      },
    });
  };
  return (
    <>
      <InfoBlock loading={addLoading} error={addError as Error} />
      {!addLoading && !isMovieInTop && (
        <div className="row py-3">
          <AddForm onAdd={onAdd} />
        </div>
      )}
    </>
  );
};

export default AddMovieContainer;
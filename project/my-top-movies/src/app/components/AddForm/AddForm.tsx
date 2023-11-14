import { gql, useMutation } from "@apollo/client";
import { useContext } from "react";
import { MovieByIdContext } from "../../providers/movieById-provider";

const AddForm = () => {
  const ADD_MOVIE = gql`
    mutation AddMovie($content: AddMovieInput!) {
      AddMovie(content: $content) {
        Title
        imdbID
        Rate
        Year
        Type
        Poster
      }
    }
  `;
  const { movieById } = useContext(MovieByIdContext);
  const [addMovie, { data, loading, error }] = useMutation(ADD_MOVIE);
  let input: HTMLInputElement;
  return (
    <form
      className="d-flex justify-content-center w-auto mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
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
        input.value = "";
      }}
    >
      <input
        ref={(node) => {
          if (node) {
            input = node;
          }
        }}
        className="form-control w-50"
        placeholder="Enter movie rate"
        required={true}
      />
      <button type="submit" className="btn btn-primary ms-3 w-auto">
        Add to top
      </button>
    </form>
  );
}

export default AddForm;
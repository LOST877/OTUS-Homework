import { FormEvent } from "react";

interface Props {
  onAdd: (input: HTMLInputElement) => void;
}

const AddForm = ({ onAdd }: Props) => {
  let input: HTMLInputElement;
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAdd(input);
    input.value = "";
  };
  return (
    <form
      className="d-flex justify-content-center w-auto mx-auto"
      onSubmit={(e) => {
        handleSubmit(e);
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
};

export default AddForm;
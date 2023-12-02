interface Props {
  onDelete: () => void;
}

const DeleteButton = ({ onDelete }: Props) => {
  const handleClick = () => {
    onDelete();
  };
  return (
    <button className="btn btn-primary mx-auto w-auto" onClick={handleClick}>
      Delete from top
    </button>
  );
};

export default DeleteButton;
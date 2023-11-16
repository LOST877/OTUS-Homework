interface Props {
  error: Error;
}

const ErrorMessage = ({ error }: Props) => (
  <div className="alert alert-danger mb-0">{error.message}</div>
);

export default ErrorMessage;

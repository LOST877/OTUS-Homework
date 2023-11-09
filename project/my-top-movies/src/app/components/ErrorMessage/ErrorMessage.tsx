interface Props {
  error: Error;
}

const ErrorMessage = (props: Props) => (
  <div className="alert alert-danger">{props.error.message}</div>
);

export default ErrorMessage;

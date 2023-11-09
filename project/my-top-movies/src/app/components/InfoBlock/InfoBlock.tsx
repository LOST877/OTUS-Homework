import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

interface Props {
  loading: boolean;
  error: Error | null;
}

const InfoBlock = (props: Props) => (
  <div className="row py-3">
    <div className="d-flex justify-content-center align-items-center">
      {props.loading && <Spinner />}
      {props.error && <ErrorMessage error={props.error} />}
    </div>
  </div>
);

export default InfoBlock;

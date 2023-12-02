import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

interface Props {
  loading: boolean;
  error: Error | null;
}

const InfoBlock = ({ loading, error }: Props) => (
  <>
    {(loading || error) && (
      <div className="row py-3">
        <div className="d-flex justify-content-center align-items-center">
          {loading && <Spinner />}
          {error && <ErrorMessage error={error} />}
        </div>
      </div>
    )}
  </>
);

export default InfoBlock;

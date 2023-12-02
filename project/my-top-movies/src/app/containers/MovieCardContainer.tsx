import { useQuery } from "@apollo/client";
import InfoBlock from "../components/InfoBlock/InfoBlock";
import MovieCardDetail from "../components/MovieCardDetail/MovieCardDetail";
import { GET_MOVIE } from "../constants";
import AddMovieContainer from "./AddMovieContainer";
import DeleteMovieContainer from "./DeleteMovieContainer";

interface Props {
  imdbID: string;
}

const MovieCardContainer = (props: Props) => {
  const { imdbID } = props;
  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_MOVIE, {
    variables: { imdbID },
  });
  
  return (
    <>
      <MovieCardDetail />
      <InfoBlock loading={queryLoading} error={queryError as Error} />
      {!queryLoading && !queryError && !!queryData?.movieByImdbid[0]?.Rate && (
        <>
          <div className="row py-3">
            <p className="card-text w-auto mx-auto">
              {queryData?.movieByImdbid[0]?.Rate} in top
            </p>
          </div>
          <DeleteMovieContainer movieId={queryData?.movieByImdbid[0]?.id} />
        </>
      )}
      <AddMovieContainer isMovieInTop={!!queryData?.movieByImdbid[0]?.Rate} />
    </>
  );
};

export default MovieCardContainer;

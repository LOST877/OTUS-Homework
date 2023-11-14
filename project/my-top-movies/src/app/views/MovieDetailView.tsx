'use client'
import Link from "next/link";
import { useContext } from "react";
import InfoBlock from "../components/InfoBlock/InfoBlock";
import MovieCardDetail from "../components/MovieCardDetail/MovieCardDetail";
import SearchByIdFormContainer from "../containers/SearchByIdFormContainer";
import { MovieByIdContext } from "../providers/movieById-provider";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AddForm from "../components/AddForm/AddForm";

const MovieDetailView = ({ params }: { params: { imdbID: string } }) => {
  const { movieById } = useContext(MovieByIdContext);
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
  });

  return (
    <>
      <ApolloProvider client={client}>
        <div className="row py-3">
          <div className="col">
            <SearchByIdFormContainer params={params} />
          </div>
        </div>
        {(movieById.loading || movieById.error) && (
          <InfoBlock loading={movieById.loading} error={movieById.error} />
        )}
        {!movieById.loading && !movieById.error && (
          <MovieCardDetail movie={movieById.movie} />
        )}
        <div className="row py-3">
          <AddForm />
        </div>
        <div className="row pb-3">
          <div className="d-flex justify-content-center">
            <Link
              href={{
                pathname: "/",
              }}
              className="btn btn-primary"
            >
              Back
            </Link>
          </div>
        </div>
      </ApolloProvider>
    </>
  );
};

export default MovieDetailView;

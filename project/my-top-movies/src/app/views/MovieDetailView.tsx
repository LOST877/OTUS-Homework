'use client'
import Link from "next/link";
import { useContext } from "react";
import InfoBlock from "../components/InfoBlock/InfoBlock";
import SearchByIdFormContainer from "../containers/SearchByIdFormContainer";
import { MovieByIdContext } from "../providers/movieById-provider";
import MovieCardContainer from "../containers/MovieCardContainer";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RouteContext } from "../providers/routes-provider";
import { Routes } from "../types";

interface Props {
  imdbID: string
}

const MovieDetailView = (props: Props) => {
  const { imdbID } = props;
  const { movieById } = useContext(MovieByIdContext);
  const { fromRoute } = useContext(RouteContext);
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <SearchByIdFormContainer imdbID={imdbID} />
      <div className="row py-3">
        <div className="col">
          <InfoBlock loading={movieById.loading} error={movieById.error} />
          {!movieById.loading && !movieById.error && (
            <MovieCardContainer imdbID={imdbID} />
          )}
        </div>
      </div>
      <div className="row pb-3">
        <div className="d-flex justify-content-center">
          <Link
            href={{
              pathname: fromRoute === Routes.SEARCH ? "/search" : "/",
            }}
            className="btn btn-primary"
          >
            Back
          </Link>
        </div>
      </div>
    </ApolloProvider>
  );
};

export default MovieDetailView;

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

const MovieDetailView = ({ params }: { params: { imdbID: string } }) => {
  const { movieById } = useContext(MovieByIdContext);
  const { fromRoute } = useContext(RouteContext);
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <div className="row py-3">
        <div className="col">
          <SearchByIdFormContainer params={params} />
        </div>
      </div>
      {(movieById.loading || movieById.error) && (
        <InfoBlock loading={movieById.loading} error={movieById.error} />
      )}
      <MovieCardContainer params={params} />
      <div className="row pb-3">
        <div className="d-flex justify-content-center">
          <Link
            href={{
              pathname: fromRoute === Routes.SEARCH ? '/search' : '/',
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

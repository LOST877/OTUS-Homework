import MovieDetailView from "../../views/MovieDetailView";

export default function Page({ params }: { params: { imdbId: string } }) {
  return <MovieDetailView imdbID={params.imdbId} />;
}
import MovieDetailView from "../../views/MovieDetailView";

export default function Page({ params }: { params: { imdbID: string } }) {
  return (
    <MovieDetailView params={params} />
  );
}
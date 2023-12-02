import React, { FormEvent, useEffect } from 'react';

interface Props {
  onSearch: (query: string) => void;
  imdbID?: string;
}

const SearchForm = ({ onSearch, imdbID }: Props) => {
  const [query, setQuery] = React.useState("");

  const handleChange = React.useCallback((event: any) => {
    setQuery(event.target.value);
  }, []);

  const handleSubmit = React.useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      onSearch(query);
    },
    [onSearch, query]
  );

  useEffect(() => {
    if (imdbID) onSearch(imdbID);
  }, []);

  return (
    <form role="searchbox" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <input
            role="search"
            name="movie-search"
            value={query}
            onChange={handleChange}
            type="search"
            placeholder={imdbID ? "Enter movie Id" : "Enter movie title"}
            className="form-control"
          />
        </div>
      </div>
    </form>
  );
};

export default SearchForm;

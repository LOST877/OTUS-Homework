import { OmdbErrorResponse, OmdbSuccessResponse } from "../types";

export const objectToQueryString = (
  object: Record<string, string | number | boolean>
) => {
  return Object.keys(object)
    .reduce((acc: string[], key) => {
      if (object.hasOwnProperty(key)) {
        acc.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`
        );
      }
      return acc;
    }, [])
    .join("&");
};

const BASE_URL = "https://www.omdbapi.com";
const API_KEY = process.env.IMDB_API_KEY || "";

export async function getByName<T extends OmdbSuccessResponse>({
  params,
}: {
  params: { query: string; page: number };
}): Promise<T> {
  const qs = objectToQueryString({
    s: params.query,
    type: "movie",
    page: params.page,
    apikey: API_KEY,
  });

  const res = await fetch(`${BASE_URL}/?${qs}`);
  const response = (await res.json()) as Promise<T | OmdbErrorResponse>;
  const data = await response;
  if (data.Response === "False") {
    throw new Error(data.Error);
  }
  return data;
}

export async function getById<T extends OmdbSuccessResponse>(
  imdbID: string
): Promise<T> {
  const qs = objectToQueryString({ i: imdbID, plot: "full", apikey: API_KEY });

  const res = await fetch(`${BASE_URL}/?${qs}`);
  const response = (await res.json()) as Promise<T | OmdbErrorResponse>;
  const data = await response;
  if (data.Response === "False") {
    throw new Error(data.Error);
  }
  return data;
}

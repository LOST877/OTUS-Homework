import { OmdbErrorResponse, OmdbSuccessResponse } from "../../../types";
import { objectToQueryString } from "../../../utils";

const BASE_URL = "https://www.omdbapi.com";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

export async function getById<T extends OmdbSuccessResponse>({
  params,
}: {
  params: { imdbID: string; };
}): Promise<T> {
  const qs = objectToQueryString({ i: params.imdbID, plot: "full", apikey: API_KEY });

  const res = await fetch(`${BASE_URL}/?${qs}`);
  const response = (await res.json()) as Promise<T | OmdbErrorResponse>;
  const data = await response;
  if (data.Response === "False") {
    throw new Error(data.Error);
  }
  return data;
}
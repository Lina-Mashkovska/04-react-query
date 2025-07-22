import axios from "axios";
import type { Movie } from "../types/movie";

const myKey = import.meta.env.VITE_TMDB_TOKEN;
interface MoviesResponse {
  results: Movie[];
  total_pages: number;
}
export const fetchMovies = async (
  query: string,
  page: number
): Promise<MoviesResponse> => {
  const response = await axios.get<MoviesResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query: query,
        page,
      },
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );

  return response.data;
};


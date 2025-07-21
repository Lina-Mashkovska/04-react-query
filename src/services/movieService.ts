import axios from "axios";
import type { Movie } from "../types/movie";

const myToken = import.meta.env.VITE_TMDB_TOKEN;

interface MovieHttpResponse {
  results: Movie[];
}

export default async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get<MovieHttpResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: { query },
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    }
  );

  return response.data.results;
}
console.log("TMDB token:", myToken)
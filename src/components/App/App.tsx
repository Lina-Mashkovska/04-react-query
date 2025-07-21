import css from "./App.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import fetchMovies from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSubmit = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMovies([]);
      const data = await fetchMovies(query);

      if (data.length === 0) {
        toast("No movies found for your request.");
        return;
      }

      setMovies(data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSubmit} />
      {movies.length > 0 && (
        <MovieGrid onSelect={handleSelect} movies={movies} />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleClose} />
      )}
      <Toaster />
    </div>
  );
}

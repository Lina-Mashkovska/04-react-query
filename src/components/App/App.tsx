import css from "./App.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import MovieModal from "../MovieModal/MovieModal";
import ReactPaginate from "react-paginate";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim().length > 0,
    placeholderData: keepPreviousData,
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  useEffect(() => {
    if (!isLoading && data && movies.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [isLoading, data, movies.length]);

  const handleSubmit = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const openModal = (movie: Movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />

      {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {movies.length > 0 && <MovieGrid onSelect={openModal} movies={movies} />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      <Toaster />
    </>
  );
}


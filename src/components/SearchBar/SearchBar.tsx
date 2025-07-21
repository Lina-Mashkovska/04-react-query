import css from "./SearchBar.module.css"
import toast, { Toaster } from "react-hot-toast";

interface SearchBarProps {
    onSubmit: (query: string) => void;
}
export default function SearchBar ({onSubmit}:SearchBarProps){
    const handleSubmin = (formData: FormData) => {
        const query = formData.get("query") as string;
        const queryTrimmed = query.trim();
        if (queryTrimmed === "") {
          toast.error("Please enter your search query.");
          return;
        }
    
        onSubmit(queryTrimmed);
      };
      return (
        <header className={css.header}>
          <div className={css.container}>
            <a
              className={css.link}
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by TMDB
            </a>
            <form className={css.form} action={handleSubmin}>
              <input
                className={css.input}
                type="text"
                name="query"
                autoComplete="off"
                placeholder="Search movies..."
                autoFocus
              />
              <button className={css.button} type="submit">
                Search
              </button>
              <Toaster />
            </form>
          </div>
        </header>
      );
}


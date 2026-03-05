import { useState, useEffect } from "react";

const API_URL = "http://localhost:5001/api/movies";

const MOVIE_GIFS = {
  Inception: "https://tenor.com/fr/view/tom-hardy-smiling-gif-20534883.gif",
  "The Dark Knight": "https://tenor.com/fr/view/batman-gif-11018350.gif",
  Interstellar: "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
  "Pulp Fiction":
    "https://tenor.com/fr/view/chorizombi-umma-thurman-john-travolta-gif-13032650.gif",
  "The Matrix":
    "https://tenor.com/fr/view/matrix-neo-keanu-reeves-power-windy-gif-15235043.gif",
};

const DEFAULT_GIF = "https://media.giphy.com/media/26u4cqiYI30ju/giphy.gif";

const getMovieGif = (title) => MOVIE_GIFS[title] ?? DEFAULT_GIF;

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterRatingMin, setFilterRatingMin] = useState("");
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [gifMovie, setGifMovie] = useState(null);
  const [newMovie, setNewMovie] = useState({
    title: "",
    year: "",
    genre: "",
    rating: "",
    id: "",
  });

  const getMovies = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setMovies(data);
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsAddPopupOpen(false);
        setGifMovie(null);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    setFilteredMovies(
      movies.filter((movie) => {
        const matchTitle = movie.title
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchGenre = !filterGenre || movie.genre === filterGenre;
        const matchYear = !filterYear || String(movie.year) === filterYear;
        const matchRating =
          !filterRatingMin || movie.rating >= Number(filterRatingMin);
        return matchTitle && matchGenre && matchYear && matchRating;
      }),
    );
  }, [movies, search, filterGenre, filterYear, filterRatingMin]);

  const genres = [...new Set(movies.map((m) => m.genre)).values()].sort();
  const years = [...new Set(movies.map((m) => m.year).filter(Boolean))].sort(
    (a, b) => b - a,
  );

  const addMovie = (e) => {
    e.preventDefault();
    const movie = {
      id: movies.length > 0 ? Math.max(...movies.map((m) => m.id)) + 1 : 1,
      title: newMovie.title,
      year: Number(newMovie.year),
      genre: newMovie.genre,
      rating: Number(newMovie.rating),
    };
    setMovies((prev) => [...prev, movie]);
    setNewMovie({ title: "", year: "", genre: "", rating: "", id: "" });
    setIsAddPopupOpen(false);
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Movies</h1>
        <p className="app__subtitle">Découvrez et gérez votre collection</p>
      </header>

      <main className="app__main">
        <section className="app__tools">
          <div className="filters">
            <div className="filters__row">
              <div className="filters__field">
                <label htmlFor="search" className="filters__label">
                  Titre
                </label>
                <input
                  id="search"
                  type="text"
                  className="filters__input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un film..."
                />
              </div>
              <div className="filters__field">
                <label htmlFor="genre" className="filters__label">
                  Genre
                </label>
                <select
                  id="genre"
                  className="filters__select"
                  value={filterGenre}
                  onChange={(e) => setFilterGenre(e.target.value)}
                >
                  <option value="">Tous les genres</option>
                  {genres.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filters__field">
                <label htmlFor="year" className="filters__label">
                  Année
                </label>
                <select
                  id="year"
                  className="filters__select"
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                >
                  <option value="">Toutes les années</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filters__field">
                <label htmlFor="rating" className="filters__label">
                  Note min.
                </label>
                <input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  className="filters__input filters__input--small"
                  value={filterRatingMin}
                  onChange={(e) => setFilterRatingMin(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn-add"
            onClick={() => setIsAddPopupOpen(true)}
          >
            + Ajouter un film
          </button>
        </section>

        {isAddPopupOpen && (
          <div
            className="popup-overlay"
            onClick={() => setIsAddPopupOpen(false)}
            aria-label="Fermer"
          >
            <div
              className="popup"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="popup-title"
            >
              <div className="popup__header">
                <h2 id="popup-title">Ajouter un film</h2>
                <button
                  type="button"
                  className="popup__close"
                  onClick={() => setIsAddPopupOpen(false)}
                  aria-label="Fermer"
                >
                  ×
                </button>
              </div>
              <form onSubmit={addMovie} className="popup__form">
                <div className="popup__field">
                  <label htmlFor="popup-title-input">Titre</label>
                  <input
                    id="popup-title-input"
                    type="text"
                    placeholder="Titre du film"
                    value={newMovie.title}
                    onChange={(e) =>
                      setNewMovie((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="popup__field">
                  <label htmlFor="popup-year">Année</label>
                  <input
                    id="popup-year"
                    type="number"
                    placeholder="Année"
                    value={newMovie.year}
                    onChange={(e) =>
                      setNewMovie((prev) => ({ ...prev, year: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="popup__field">
                  <label htmlFor="popup-genre">Genre</label>
                  <input
                    id="popup-genre"
                    type="text"
                    placeholder="Genre"
                    value={newMovie.genre}
                    onChange={(e) =>
                      setNewMovie((prev) => ({
                        ...prev,
                        genre: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="popup__field">
                  <label htmlFor="popup-rating">Note</label>
                  <input
                    id="popup-rating"
                    type="number"
                    step="0.1"
                    placeholder="Note (0-10)"
                    value={newMovie.rating}
                    onChange={(e) =>
                      setNewMovie((prev) => ({
                        ...prev,
                        rating: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="popup__actions">
                  <button
                    type="button"
                    className="popup__btn-cancel"
                    onClick={() => setIsAddPopupOpen(false)}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="popup__btn-submit">
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {filteredMovies.length === 0 ? (
          <p className="movie-grid__empty">
            {movies.length === 0
              ? "Chargement..."
              : "Aucun film ne correspond à vos critères."}
          </p>
        ) : (
          <ul className="movie-grid">
            {filteredMovies.map((movie) => (
              <li
                key={movie.id}
                className="movie-card movie-card--clickable"
                onClick={() => setGifMovie(movie)}
                onKeyDown={(e) => e.key === "Enter" && setGifMovie(movie)}
                role="button"
                tabIndex={0}
                aria-label={`Voir le GIF de ${movie.title}`}
              >
                <span className="movie-card__gif-hint">
                  🎬 Clique pour le GIF !
                </span>
                <span
                  className="movie-card__rating"
                  aria-label={`Note: ${movie.rating}`}
                >
                  ★ {movie.rating}
                </span>
                <h2 className="movie-card__title">{movie.title}</h2>
                <div className="movie-card__meta">
                  <span className="movie-card__year">{movie.year}</span>
                  <span className="movie-card__genre">{movie.genre}</span>
                </div>
              </li>
            ))}
          </ul>
        )}

        {gifMovie && (
          <div
            className="popup-overlay popup-overlay--gif"
            onClick={() => setGifMovie(null)}
            aria-label="Fermer"
          >
            <div
              className="popup popup--gif"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="gif-title"
            >
              <div className="popup__header">
                <h2 id="gif-title">{gifMovie.title} 🎞️</h2>
                <button
                  type="button"
                  className="popup__close"
                  onClick={() => setGifMovie(null)}
                  aria-label="Fermer"
                >
                  ×
                </button>
              </div>
              <div className="popup__gif-content">
                <img
                  src={getMovieGif(gifMovie.title)}
                  alt={`GIF rigolo de ${gifMovie.title}`}
                  className="popup__gif"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

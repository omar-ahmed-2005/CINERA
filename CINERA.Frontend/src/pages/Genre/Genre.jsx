import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import MovieCard from "../../components/MovieCard/MovieCard";

import {
  getMoviesByGenre,
  getPosterUrl,
} from "../../services/tmdb";

import "./Genre.css";

const genreIds = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  drama: 18,
  fantasy: 14,
  horror: 27,
  mystery: 9648,
  romance: 10749,
  "science fiction": 878,
  "sci-fi": 878,
  thriller: 53,
  war: 10752,
  western: 37,
  history: 36,
  music: 10402,
};

const Genre = () => {
  const { genreName } = useParams();
  const navigate = useNavigate();

  const [genreMovies, setGenreMovies] = useState([]);
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const decodedGenre = decodeURIComponent(genreName);

  useEffect(() => {
    const loadGenreMovies = async () => {
      setLoading(true);
      setError(false);

      try {
        const genreId =
          genreIds[decodedGenre.toLowerCase()];

        if (!genreId) {
          setGenreMovies([]);
          return;
        }

        // كل صفحة عندنا = 40 فيلم
        // TMDB page 1 + page 2 = 40 فيلم
        const tmdbPage1 = (page - 1) * 2 + 1;
        const tmdbPage2 = tmdbPage1 + 1;

        const [data1, data2] = await Promise.all([
          getMoviesByGenre(genreId, tmdbPage1),
          getMoviesByGenre(genreId, tmdbPage2),
        ]);

        const combinedResults = [
          ...(data1?.results || []),
          ...(data2?.results || []),
        ];

        const normalized = combinedResults.map(
          (movie) => ({
            id: movie.id,

            title: movie.title,

            poster: movie.poster_path
              ? getPosterUrl(movie.poster_path)
              : null,

            poster_path: movie.poster_path,

            backdrop: movie.backdrop_path
              ? getPosterUrl(movie.backdrop_path)
              : null,

            backdrop_path: movie.backdrop_path,

            year: (
              movie.release_date || ""
            ).slice(0, 4),

            release_date:
              movie.release_date || "",

            rating:
              movie.vote_average || 0,

            overview:
              movie.overview || "",

            type: "movie",

            genres: [decodedGenre],
          })
        );

        setGenreMovies(normalized);

        // TMDB عنده 20 فيلم لكل صفحة
        // لذلك صفحتين TMDB = صفحة واحدة عندنا
        const tmdbTotalPages =
          data1?.total_pages || 1;

        setTotalPages(
          Math.ceil(tmdbTotalPages / 2)
        );
      } catch (error) {
        console.error(
          "Failed to load genre:",
          error
        );

        setError(true);
        setGenreMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadGenreMovies();
  }, [decodedGenre, page]);

  // ==============================
  // NEXT PAGE
  // ==============================

  const nextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // ==============================
  // PREVIOUS PAGE
  // ==============================

  const previousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <main className="genre-page">
        <div className="genre-loading">
          <h2>Loading...</h2>

          <p>
            Finding {decodedGenre} movies
          </p>
        </div>
      </main>
    );
  }

  // ==============================
  // ERROR
  // ==============================

  if (error) {
    return (
      <main className="genre-page">
        <div className="genre-empty">
          <h2>Something went wrong</h2>

          <p>
            We couldn't load this genre.
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // ==============================
  // PAGE
  // ==============================

  return (
    <main className="genre-page">

      <div className="genre-page-header">

        <button
          className="genre-back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div>
          <p className="genre-label">
            CATEGORY
          </p>

          <h1>
            {decodedGenre}
          </h1>

          <p className="genre-count">
            {genreMovies.length} titles
          </p>
        </div>

      </div>

      {genreMovies.length > 0 ? (
        <>
          {/* MOVIES */}

          <div className="genre-movie-grid">

            {genreMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}

          </div>

          {/* PAGINATION */}

          <div className="genre-pagination">

            <button
              disabled={page === 1}
              onClick={previousPage}
            >
              <ChevronLeft size={18} />

              Previous
            </button>

            <div className="genre-page-number">
              {page}
            </div>

            <button
              disabled={page >= totalPages}
              onClick={nextPage}
            >
              Next

              <ChevronRight size={18} />
            </button>

          </div>
        </>
      ) : (
        <div className="genre-empty">

          <h2>No movies found</h2>

          <p>
            There are no movies in this category.
          </p>

        </div>
      )}

    </main>
  );
};

export default Genre;
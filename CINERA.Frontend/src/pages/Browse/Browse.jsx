import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import MovieCard from "../../components/MovieCard/MovieCard";

import {
  getTrendingMovies,
  getTopRatedMovies,
  getPosterUrl,
  getBackdropUrl,
} from "../../services/tmdb";

import "./Browse.css";

const Browse = () => {
  const navigate = useNavigate();

  const { type } = useParams();

  const isTopRated =
    type === "top-rated";

  const pageTitle = isTopRated
    ? "Top Rated"
    : "Trending Now";

  const pageDescription = isTopRated
    ? "The highest rated movies on CINERA"
    : "The movies everyone is watching right now";

  const [browseMovies, setBrowseMovies] =
    useState([]);

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  // ==============================
  // LOAD MOVIES
  // ==============================

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(false);

      try {
        // ==================================
        // 40 MOVIES
        // 2 TMDB PAGES × 20 MOVIES
        // ==================================

        const tmdbPage1 =
          (page - 1) * 2 + 1;

        const tmdbPage2 =
          tmdbPage1 + 1;

        let data1;
        let data2;

        // ==================================
        // TOP RATED
        // ==================================

        if (isTopRated) {
          [
            data1,
            data2,
          ] = await Promise.all([
            getTopRatedMovies(
              tmdbPage1
            ),

            getTopRatedMovies(
              tmdbPage2
            ),
          ]);
        }

        // ==================================
        // TRENDING
        // ==================================

        else {
          [
            data1,
            data2,
          ] = await Promise.all([
            getTrendingMovies(
              "week",
              tmdbPage1
            ),

            getTrendingMovies(
              "week",
              tmdbPage2
            ),
          ]);
        }

        // ==================================
        // COMBINE
        // ==================================

        const combined = [
          ...(data1?.results || []),
          ...(data2?.results || []),
        ];

        // ==================================
        // REMOVE DUPLICATES
        // ==================================

        const uniqueMovies = Array.from(
          new Map(
            combined.map((movie) => [
              movie.id,
              movie,
            ])
          ).values()
        );

        // ==================================
        // NORMALIZE
        // ==================================

        const normalized =
          uniqueMovies.map(
            (movie) => ({
              id: movie.id,

              tmdbId: movie.id,

              title:
                movie.title ||
                movie.name ||
                "Untitled",

              year:
                (
                  movie.release_date ||
                  movie.first_air_date ||
                  ""
                ).slice(0, 4) ||
                "N/A",

              release_date:
                movie.release_date ||
                "",

              rating:
                movie.vote_average || 0,

              tmdbRating:
                movie.vote_average || 0,

              overview:
                movie.overview || "",

              poster:
                movie.poster_path
                  ? getPosterUrl(
                      movie.poster_path
                    )
                  : null,

              poster_path:
                movie.poster_path ||
                null,

              backdrop:
                movie.backdrop_path
                  ? getBackdropUrl(
                      movie.backdrop_path
                    )
                  : null,

              backdrop_path:
                movie.backdrop_path ||
                null,

              popularity:
                movie.popularity || 0,

              type: "movie",

              genres: [],
            })
          );

        setBrowseMovies(
          normalized
        );

        // ==================================
        // TOTAL PAGES
        // ==================================

        const tmdbTotalPages =
          data1?.total_pages || 1;

        setTotalPages(
          Math.ceil(
            tmdbTotalPages / 2
          )
        );
      } catch (error) {
        console.error(
          `${pageTitle} error:`,
          error
        );

        setBrowseMovies([]);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [page, isTopRated, pageTitle]);

  // ==============================
  // NEXT PAGE
  // ==============================

  const nextPage = () => {
    if (page < totalPages) {
      setPage(
        (previous) =>
          previous + 1
      );

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
      setPage(
        (previous) =>
          previous - 1
      );

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
      <main className="browse-page">

        <div className="browse-loading">

          <h2>
            Loading...
          </h2>

          <p>
            {isTopRated
              ? "Finding the highest rated movies"
              : "Finding what's trending right now"}
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
      <main className="browse-page">

        <div className="browse-empty">

          <h2>
            Something went wrong
          </h2>

          <p>
            We couldn't load{" "}
            {pageTitle.toLowerCase()} movies.
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
    <main className="browse-page">

      {/* ============================== */}
      {/* HEADER */}
      {/* ============================== */}

      <div className="browse-header">

        <button
          className="browse-back-btn"
          onClick={() =>
            navigate(-1)
          }
        >
          ← Back
        </button>

        <div>

          <p className="browse-label">
            CINERA COLLECTION
          </p>

          <h1>
            {pageTitle}
          </h1>

          <p className="browse-count">
            {browseMovies.length} titles
          </p>

          <p className="browse-description">
            {pageDescription}
          </p>

        </div>

      </div>

      {/* ============================== */}
      {/* MOVIES */}
      {/* ============================== */}

      {browseMovies.length > 0 ? (
        <>

          <div className="browse-grid">

            {browseMovies.map(
              (movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              )
            )}

          </div>

          {/* ============================== */}
          {/* PAGINATION */}
          {/* ============================== */}

          <div className="browse-pagination">

            <button
              disabled={page === 1}
              onClick={
                previousPage
              }
            >
              <ChevronLeft
                size={18}
              />

              Previous
            </button>

            <div className="browse-page-number">
              {page}
            </div>

            <button
              disabled={
                page >= totalPages
              }
              onClick={nextPage}
            >
              Next

              <ChevronRight
                size={18}
              />
            </button>

          </div>

        </>
      ) : (
        <div className="browse-empty">

          <h2>
            No movies found
          </h2>

          <p>
            There are no{" "}
            {pageTitle.toLowerCase()}{" "}
            movies available.
          </p>

        </div>
      )}

    </main>
  );
};

export default Browse;
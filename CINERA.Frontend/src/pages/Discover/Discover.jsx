import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import MovieCard from "../../components/MovieCard/MovieCard";

import {
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getPopularTV,
  getTopRatedTV,
  getPosterUrl,
} from "../../services/tmdb";

import "./Discover.css";

const Discover = () => {
  const [category, setCategory] =
    useState("popular");

  const [type, setType] =
    useState("movie");

  const [movies, setMovies] =
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
  // LOAD DATA
  // ==============================

  const loadMovies = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      let data;

      // ==========================
      // TV
      // ==========================

      if (type === "tv") {
        if (category === "popular") {
          data = await getPopularTV(page);
        } else {
          data = await getTopRatedTV(page);
        }
      }

      // ==========================
      // MOVIES
      // ==========================

      else {
        if (category === "popular") {
          data = await getPopularMovies(page);
        } else if (
          category === "top-rated"
        ) {
          data =
            await getTopRatedMovies(page);
        } else if (
          category === "now-playing"
        ) {
          data =
            await getNowPlayingMovies(page);
        } else if (
          category === "upcoming"
        ) {
          data =
            await getUpcomingMovies(page);
        }
      }

      // ==========================
      // NORMALIZE DATA
      // ==========================

      const normalized =
        (data?.results || []).map(
          (item) => ({
            id: item.id,

            title:
              item.title ||
              item.name,

            poster:
              getPosterUrl(
                item.poster_path
              ),

            poster_path:
              item.poster_path,

            backdrop:
              getPosterUrl(
                item.backdrop_path
              ),

            backdrop_path:
              item.backdrop_path,

            year: (
              item.release_date ||
              item.first_air_date ||
              ""
            ).slice(0, 4),

            release_date:
              item.release_date ||
              item.first_air_date ||
              "",

            rating:
              item.vote_average || 0,

            overview:
              item.overview || "",

            type:
              type === "tv"
                ? "series"
                : "movie",
          })
        );

      setMovies(normalized);

      setTotalPages(
        Math.min(
          data?.total_pages || 1,
          500
        )
      );
    } catch (err) {
      console.error(
        "Discover error:",
        err
      );

      setError(true);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [category, type, page]);

  // ==============================
  // LOAD WHEN FILTER CHANGES
  // ==============================

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  // ==============================
  // CATEGORY
  // ==============================

  const changeCategory = (value) => {
    setCategory(value);
    setPage(1);
  };

  // ==============================
  // TYPE
  // ==============================

  const changeType = (value) => {
    setType(value);
    setPage(1);

    if (
      value === "tv" &&
      category !== "popular" &&
      category !== "top-rated"
    ) {
      setCategory("popular");
    }
  };

  // ==============================
  // PAGINATION
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
  // RENDER
  // ==============================

  return (
    <main className="discover-page">

      {/* HERO */}

      <section className="discover-hero">

        <div>

          <p className="discover-label">
            CINERA DISCOVER
          </p>

          <h1>
            Explore Movies
            <br />
            & TV Shows
          </h1>

          <p className="discover-description">
            Discover popular movies,
            highly rated films, upcoming
            releases and more.
          </p>

        </div>

      </section>

      {/* FILTERS */}

      <section className="discover-controls">

        {/* TYPE */}

        <div className="discover-type">

          <button
            className={
              type === "movie"
                ? "active"
                : ""
            }
            onClick={() =>
              changeType("movie")
            }
          >
            Movies
          </button>

          <button
            className={
              type === "tv"
                ? "active"
                : ""
            }
            onClick={() =>
              changeType("tv")
            }
          >
            TV Shows
          </button>

        </div>

        {/* CATEGORIES */}

        <div className="discover-categories">

          <button
            className={
              category === "popular"
                ? "active"
                : ""
            }
            onClick={() =>
              changeCategory("popular")
            }
          >
            Popular
          </button>

          <button
            className={
              category === "top-rated"
                ? "active"
                : ""
            }
            onClick={() =>
              changeCategory("top-rated")
            }
          >
            Top Rated
          </button>

          {type === "movie" && (
            <>
              <button
                className={
                  category ===
                  "now-playing"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  changeCategory(
                    "now-playing"
                  )
                }
              >
                Now Playing
              </button>

              <button
                className={
                  category ===
                  "upcoming"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  changeCategory(
                    "upcoming"
                  )
                }
              >
                Upcoming
              </button>
            </>
          )}

        </div>

      </section>

      {/* RESULTS */}

      <section className="discover-results">

        <div className="discover-results-header">

          <div>

            <p>
              DISCOVER
            </p>

            <h2>
              {category === "popular" &&
                "Popular"}

              {category === "top-rated" &&
                "Top Rated"}

              {category ===
                "now-playing" &&
                "Now Playing"}

              {category === "upcoming" &&
                "Upcoming"}

              {" "}

              {type === "tv"
                ? "TV Shows"
                : "Movies"}
            </h2>

          </div>

          <span>
            Page {page}
          </span>

        </div>

        {/* LOADING */}

        {loading && (
          <div className="discover-loading">

            <div className="loading-spinner" />

            <p>
              Loading movies...
            </p>

          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="discover-error">

            <h2>
              Something went wrong
            </h2>

            <p>
              We couldn't load the movies.
            </p>

            <button
              onClick={loadMovies}
            >
              Try Again
            </button>

          </div>
        )}

        {/* RESULTS */}

        {!loading &&
          !error &&
          movies.length > 0 && (
            <div className="discover-grid">

              {movies.map((movie) => (
                <MovieCard
                  key={`${type}-${movie.id}`}
                  movie={movie}
                />
              ))}

            </div>
          )}

        {/* PAGINATION */}

        {!loading &&
          !error &&
          movies.length > 0 && (
            <div className="discover-pagination">

              <button
                disabled={page === 1}
                onClick={previousPage}
              >
                <ChevronLeft size={18} />
                Previous
              </button>

              <div className="page-number">
                {page}
              </div>

              <button
                disabled={
                  page >= totalPages
                }
                onClick={nextPage}
              >
                Next
                <ChevronRight size={18} />
              </button>

            </div>
          )}

      </section>

    </main>
  );
};

export default Discover;
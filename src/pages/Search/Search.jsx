import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useSearchParams } from "react-router-dom";

import {
  Search as SearchIcon,
  X,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

import MovieCard from "../../components/MovieCard/MovieCard";

import {
  searchMovies,
  searchTVShows,
  getPosterUrl,
  getBackdropUrl,
} from "../../services/tmdb";

import "./Search.css";

const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const Search = () => {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const [query, setQuery] = useState(
    searchParams.get("q") || ""
  );

  const [results, setResults] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const [searched, setSearched] =
    useState(false);

  // ==============================
  // FILTERS
  // ==============================

  const [typeFilter, setTypeFilter] =
    useState("all");

  const [genreFilter, setGenreFilter] =
    useState("all");

  const [ratingFilter, setRatingFilter] =
    useState("all");

  const [yearFilter, setYearFilter] =
    useState("all");

  const [sortFilter, setSortFilter] =
    useState("popularity");

  const [filtersOpen, setFiltersOpen] =
    useState(false);

  // ==============================
  // SEARCH
  // ==============================

  const performSearch = useCallback(
    async (value) => {
      const searchValue =
        value.trim();

      if (!searchValue) {
        return;
      }

      setLoading(true);
      setSearched(true);

      try {
        const [
          movies,
          tvShows,
        ] = await Promise.all([
          searchMovies(searchValue),
          searchTVShows(searchValue),
        ]);

        // ==========================
        // MOVIES
        // ==========================

        const movieResults =
          movies.map((movie) => ({
            id: movie.id,

            tmdbId: movie.id,

            title: movie.title,

            year:
              movie.release_date?.slice(
                0,
                4
              ) || "N/A",

            rating:
              movie.vote_average || 0,

            popularity:
              movie.popularity || 0,

            overview:
              movie.overview || "",

            poster: getPosterUrl(
              movie.poster_path
            ),

            backdrop:
              getBackdropUrl(
                movie.backdrop_path
              ),

            poster_path:
              movie.poster_path,

            backdrop_path:
              movie.backdrop_path,

            release_date:
              movie.release_date || "",

            genre_ids:
              movie.genre_ids || [],

            type: "movie",

            genres: [],
          }));

        // ==========================
        // TV SHOWS
        // ==========================

        const tvResults =
          tvShows.map((show) => ({
            id: `tv-${show.id}`,

            tmdbId: show.id,

            title: show.name,

            year:
              show.first_air_date?.slice(
                0,
                4
              ) || "N/A",

            rating:
              show.vote_average || 0,

            popularity:
              show.popularity || 0,

            overview:
              show.overview || "",

            poster: getPosterUrl(
              show.poster_path
            ),

            backdrop:
              getBackdropUrl(
                show.backdrop_path
              ),

            poster_path:
              show.poster_path,

            backdrop_path:
              show.backdrop_path,

            release_date:
              show.first_air_date || "",

            genre_ids:
              show.genre_ids || [],

            type: "series",

            genres: [],
          }));

        // ==========================
        // COMBINE
        // ==========================

        const combinedResults = [
          ...movieResults,
          ...tvResults,
        ];

        setResults(
          combinedResults
        );
      } catch (error) {
        console.error(
          "Search error:",
          error
        );

        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ==============================
  // URL SEARCH
  // ==============================

  useEffect(() => {
    const value =
      searchParams.get("q");

    if (!value) {
      setResults([]);
      setSearched(false);
      return;
    }

    setQuery(value);

    performSearch(value);
  }, [
    searchParams,
    performSearch,
  ]);

  // ==============================
  // FILTERED RESULTS
  // ==============================

  const filteredResults =
    useMemo(() => {
      let filtered = [
        ...results,
      ];

      // TYPE
      if (typeFilter !== "all") {
        filtered =
          filtered.filter(
            (movie) =>
              movie.type ===
              typeFilter
          );
      }

      // GENRE
      if (genreFilter !== "all") {
        const genreId =
          Number(genreFilter);

        filtered =
          filtered.filter(
            (movie) =>
              movie.genre_ids?.includes(
                genreId
              )
          );
      }

      // RATING
      if (ratingFilter !== "all") {
        const minRating =
          Number(ratingFilter);

        filtered =
          filtered.filter(
            (movie) =>
              movie.rating >=
              minRating
          );
      }

      // YEAR
      if (yearFilter !== "all") {
        filtered =
          filtered.filter(
            (movie) =>
              movie.year ===
              yearFilter
          );
      }

      // SORT
      if (
        sortFilter ===
        "popularity"
      ) {
        filtered.sort(
          (a, b) =>
            b.popularity -
            a.popularity
        );
      }

      if (
        sortFilter ===
        "rating"
      ) {
        filtered.sort(
          (a, b) =>
            b.rating -
            a.rating
        );
      }

      if (
        sortFilter ===
        "newest"
      ) {
        filtered.sort(
          (a, b) =>
            Number(b.year) -
            Number(a.year)
        );
      }

      if (
        sortFilter ===
        "oldest"
      ) {
        filtered.sort(
          (a, b) =>
            Number(a.year) -
            Number(b.year)
        );
      }

      return filtered;
    }, [
      results,
      typeFilter,
      genreFilter,
      ratingFilter,
      yearFilter,
      sortFilter,
    ]);

  // ==============================
  // YEARS
  // ==============================

  const years = useMemo(() => {
    return [
      ...new Set(
        results
          .map(
            (movie) =>
              movie.year
          )
          .filter(
            (year) =>
              year !== "N/A"
          )
      ),
    ].sort(
      (a, b) =>
        Number(b) -
        Number(a)
    );
  }, [results]);

  // ==============================
  // SUBMIT
  // ==============================

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    const value =
      query.trim();

    if (!value) {
      return;
    }

    setSearchParams({
      q: value,
    });
  };

  // ==============================
  // CLEAR SEARCH
  // ==============================

  const clearSearch = () => {
    setQuery("");

    setResults([]);

    setSearched(false);

    setSearchParams({});
  };

  // ==============================
  // CLEAR FILTERS
  // ==============================

  const clearFilters = () => {
    setTypeFilter("all");
    setGenreFilter("all");
    setRatingFilter("all");
    setYearFilter("all");
    setSortFilter("popularity");
  };

  // ==============================
  // ACTIVE FILTER COUNT
  // ==============================

  const activeFilterCount =
    [
      typeFilter !== "all",
      genreFilter !== "all",
      ratingFilter !== "all",
      yearFilter !== "all",
      sortFilter !==
        "popularity",
    ].filter(Boolean).length;

  // ==============================
  // RENDER
  // ==============================

  return (
    <main className="search-page">

      {/* HEADER */}

      <section className="search-header">

        <p className="search-label">
          CINERA SEARCH
        </p>

        <h1>
          Find your next movie
        </h1>

        <p className="search-description">
          Search through thousands of
          movies and TV shows and
          discover something new to
          watch.
        </p>

      </section>

      {/* SEARCH BAR */}

      <form
        className="search-form"
        onSubmit={handleSubmit}
      >

        <SearchIcon
          className="search-icon"
          size={22}
        />

        <input
          type="text"
          value={query}
          onChange={(event) =>
            setQuery(
              event.target.value
            )
          }
          placeholder="Search for a movie or TV show..."
        />

        {query && (
          <button
            type="button"
            className="search-clear"
            onClick={
              clearSearch
            }
          >
            <X size={18} />
          </button>
        )}

        <button
          type="submit"
          className="search-submit"
        >
          Search
        </button>

      </form>

      {/* FILTER BUTTON */}

      {results.length > 0 && (
        <div className="search-filter-wrapper">

          <button
            className={`filter-toggle ${
              filtersOpen
                ? "active"
                : ""
            }`}
            onClick={() =>
              setFiltersOpen(
                !filtersOpen
              )
            }
          >
            <SlidersHorizontal
              size={18}
            />

            Filters

            {activeFilterCount >
              0 && (
              <span>
                {
                  activeFilterCount
                }
              </span>
            )}
          </button>

        </div>
      )}

      {/* FILTER PANEL */}

      {filtersOpen &&
        results.length > 0 && (
          <section className="search-filters">

            {/* TYPE */}

            <div className="filter-group">

              <label>
                Type
              </label>

              <select
                value={
                  typeFilter
                }
                onChange={(event) =>
                  setTypeFilter(
                    event.target
                      .value
                  )
                }
              >
                <option value="all">
                  All
                </option>

                <option value="movie">
                  Movies
                </option>

                <option value="series">
                  TV Shows
                </option>
              </select>

            </div>

            {/* GENRE */}

            <div className="filter-group">

              <label>
                Genre
              </label>

              <select
                value={
                  genreFilter
                }
                onChange={(event) =>
                  setGenreFilter(
                    event.target
                      .value
                  )
                }
              >
                <option value="all">
                  All Genres
                </option>

                {GENRES.map(
                  (genre) => (
                    <option
                      key={
                        genre.id
                      }
                      value={
                        genre.id
                      }
                    >
                      {
                        genre.name
                      }
                    </option>
                  )
                )}
              </select>

            </div>

            {/* RATING */}

            <div className="filter-group">

              <label>
                Minimum Rating
              </label>

              <select
                value={
                  ratingFilter
                }
                onChange={(event) =>
                  setRatingFilter(
                    event.target
                      .value
                  )
                }
              >
                <option value="all">
                  Any Rating
                </option>

                <option value="5">
                  5+
                </option>

                <option value="6">
                  6+
                </option>

                <option value="7">
                  7+
                </option>

                <option value="8">
                  8+
                </option>

                <option value="9">
                  9+
                </option>
              </select>

            </div>

            {/* YEAR */}

            <div className="filter-group">

              <label>
                Year
              </label>

              <select
                value={
                  yearFilter
                }
                onChange={(event) =>
                  setYearFilter(
                    event.target
                      .value
                  )
                }
              >
                <option value="all">
                  All Years
                </option>

                {years.map(
                  (year) => (
                    <option
                      key={year}
                      value={year}
                    >
                      {year}
                    </option>
                  )
                )}
              </select>

            </div>

            {/* SORT */}

            <div className="filter-group">

              <label>
                Sort By
              </label>

              <select
                value={
                  sortFilter
                }
                onChange={(event) =>
                  setSortFilter(
                    event.target
                      .value
                  )
                }
              >
                <option value="popularity">
                  Popularity
                </option>

                <option value="rating">
                  Rating
                </option>

                <option value="newest">
                  Newest
                </option>

                <option value="oldest">
                  Oldest
                </option>
              </select>

            </div>

            {/* CLEAR */}

            <button
              className="clear-filters"
              onClick={
                clearFilters
              }
            >
              <RotateCcw
                size={16}
              />

              Clear
            </button>

          </section>
        )}

      {/* LOADING */}

      {loading && (
        <div className="search-status">

          <h2>
            Searching...
          </h2>

          <p>
            Looking through CINERA
          </p>

        </div>
      )}

      {/* NO RESULTS */}

      {!loading &&
        searched &&
        results.length === 0 && (
          <div className="search-status">

            <h2>
              No results found
            </h2>

            <p>
              Try searching with another
              title.
            </p>

          </div>
        )}

      {/* FILTERED EMPTY */}

      {!loading &&
        searched &&
        results.length > 0 &&
        filteredResults.length ===
          0 && (
          <div className="search-status">

            <h2>
              No matching results
            </h2>

            <p>
              Try changing your
              filters.
            </p>

            <button
              className="clear-empty-filters"
              onClick={
                clearFilters
              }
            >
              Clear Filters
            </button>

          </div>
        )}

      {/* RESULTS */}

      {!loading &&
        filteredResults.length >
          0 && (
          <section className="search-results">

            <div className="search-results-header">

              <div>

                <h2>
                  Search Results
                </h2>

                <p>
                  Results for "
                  {query}"
                </p>

              </div>

              <span>
                {
                  filteredResults.length
                }{" "}
                results
              </span>

            </div>

            <div className="search-grid">

              {filteredResults.map(
                (movie) => (
                  <MovieCard
                    key={`${movie.type}-${movie.id}`}
                    movie={movie}
                  />
                )
              )}

            </div>

          </section>
        )}

    </main>
  );
};

export default Search;
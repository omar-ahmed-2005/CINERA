import React, { useMemo, useState } from "react";

import {
  Search,
  Film,
  Star,
  Trash2,
} from "lucide-react";

import movies from "../../../data/movies";

import "./Movies.css";

const Movies = () => {
  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const title =
        movie.title || "";

      const matchesSearch =
        title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesFilter =
        filter === "all" ||
        (filter === "movies" &&
          movie.type !== "series") ||
        (filter === "series" &&
          movie.type === "series");

      return (
        matchesSearch &&
        matchesFilter
      );
    });
  }, [search, filter]);

  const handleDelete = (movie) => {
    window.alert(
      `"${movie.title}" is part of the local movie collection and cannot be permanently deleted from the source data from this page yet.`
    );
  };

  return (
    <main className="admin-movies">

      <div className="movies-container">

        {/* HEADER */}

        <section className="movies-header">

          <div>

            <p className="movies-label">
              CINERA ADMIN
            </p>

            <h1>
              Movies
            </h1>

            <p>
              Manage and explore the CINERA
              movie collection.
            </p>

          </div>

          <div className="movies-count">
            <Film size={18} />

            <span>
              {filteredMovies.length} titles
            </span>
          </div>

        </section>

        {/* CONTROLS */}

        <section className="movies-controls">

          <div className="movies-search">

            <Search size={19} />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search movies..."
            />

          </div>

          <div className="movies-filters">

            <button
              className={
                filter === "all"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setFilter("all")
              }
            >
              All
            </button>

            <button
              className={
                filter === "movies"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setFilter("movies")
              }
            >
              Movies
            </button>

            <button
              className={
                filter === "series"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setFilter("series")
              }
            >
              TV Shows
            </button>

          </div>

        </section>

        {/* MOVIES */}

        {filteredMovies.length > 0 ? (

          <section className="movies-table">

            <div className="movies-table-header">

              <span>
                TITLE
              </span>

              <span>
                TYPE
              </span>

              <span>
                YEAR
              </span>

              <span>
                RATING
              </span>

              <span>
                ACTION
              </span>

            </div>

            {filteredMovies.map(
              (movie) => (

                <div
                  className="movie-row"
                  key={movie.id}
                >

                  <div className="movie-title">

                    <div className="movie-poster">

                      {movie.poster ? (
                        <img
                          src={
                            movie.poster
                          }
                          alt={
                            movie.title
                          }
                        />
                      ) : (
                        <Film size={20} />
                      )}

                    </div>

                    <div>

                      <strong>
                        {movie.title}
                      </strong>

                      <span>
                        ID: {movie.id}
                      </span>

                    </div>

                  </div>

                  <span className="movie-type">

                    {movie.type ===
                    "series"
                      ? "TV Show"
                      : "Movie"}

                  </span>

                  <span className="movie-year">

                    {movie.year ||
                      movie.release_date?.slice(
                        0,
                        4
                      ) ||
                      "N/A"}

                  </span>

                  <span className="movie-rating">

                    <Star size={14} />

                    {movie.rating
                      ? Number(
                          movie.rating
                        ).toFixed(1)
                      : "N/A"}

                  </span>

                  <button
                    className="movie-delete"
                    onClick={() =>
                      handleDelete(
                        movie
                      )
                    }
                    title="Delete movie"
                  >
                    <Trash2
                      size={17}
                    />
                  </button>

                </div>

              )
            )}

          </section>

        ) : (

          <section className="movies-empty">

            <Film size={40} />

            <h2>
              No titles found
            </h2>

            <p>
              Try another search or filter.
            </p>

          </section>

        )}

      </div>

    </main>
  );
};

export default Movies;
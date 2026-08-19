import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Tags,
  Film,
} from "lucide-react";
import { getMovies } from "../../../services/admin";

import "./Genres.css";

const Genres = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const data = await getMovies();
        setMoviesList(data);
      } catch (err) {
        setError("Failed to load genres.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMoviesData();
  }, []);

  const genres = useMemo(() => {
    const genreMap = {};

    moviesList.forEach((movie) => {
      let movieGenres = [];
      if (Array.isArray(movie.genres)) {
        movieGenres = movie.genres;
      } else if (typeof movie.genres === "string") {
        movieGenres = movie.genres.split(",").map((g) => g.trim());
      }

      movieGenres.forEach((genre) => {
        if (!genre) {
          return;
        }

        const normalizedGenre = genre.trim();

        if (!genreMap[normalizedGenre]) {
          genreMap[normalizedGenre] = 0;
        }

        genreMap[normalizedGenre] += 1;
      });
    });

    return Object.entries(genreMap)
      .map(([name, count]) => ({
        name,
        count,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [moviesList]);

  const filteredGenres = genres.filter((genre) =>
    genre.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="admin-genres">

      <div className="genres-container">

        {/* HEADER */}

        <section className="genres-header">

          <div>

            <p className="genres-label">
              CINERA ADMIN
            </p>

            <h1>
              Genres
            </h1>

            <p>
              Manage and explore movie
              categories.
            </p>

          </div>

          <div className="genres-count">

            <Tags size={18} />

            <span>
              {genres.length} genres
            </span>

          </div>

        </section>

        {/* SEARCH */}

        <section className="genres-controls">

          <div className="genres-search">

            <Search size={19} />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search genres..."
            />

          </div>

        </section>

        {/* GENRES */}

        {filteredGenres.length > 0 ? (

          <section className="genres-grid">

            {filteredGenres.map(
              (genre) => (

                <article
                  className="genre-card"
                  key={genre.name}
                >

                  <div className="genre-icon">

                    <Tags size={21} />

                  </div>

                  <div className="genre-info">

                    <h2>
                      {genre.name}
                    </h2>

                    <div>

                      <Film size={14} />

                      <span>
                        {genre.count}{" "}
                        {genre.count === 1
                          ? "title"
                          : "titles"}
                      </span>

                    </div>

                  </div>

                  <span className="genre-arrow">
                    →
                  </span>

                </article>

              )
            )}

          </section>

        ) : (

          <section className="genres-empty">

            <Tags size={40} />

            <h2>
              No genres found
            </h2>

            <p>
              Try searching for another
              genre.
            </p>

          </section>

        )}

      </div>

    </main>
  );
};

export default Genres;
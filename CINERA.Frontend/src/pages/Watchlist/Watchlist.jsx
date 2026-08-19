import React, {
  useEffect,
  useState,
} from "react";

import {
  Heart,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  getWatchlist,
  removeFromWatchlist,
} from "../../services/watchlist";

import { getPosterUrl } from "../../services/tmdb";

import "./Watchlist.css";

const Watchlist = () => {
  const navigate = useNavigate();

  const [movies, setMovies] =
    useState([]);

  useEffect(() => {
    setMovies(getWatchlist());
  }, []);

  const handleRemove = (
    event,
    movieId
  ) => {
    event.stopPropagation();

    const updated =
      removeFromWatchlist(movieId);

    setMovies(updated);
  };

  return (
    <main className="watchlist-page">

      <section className="watchlist-header">

        <div>

          <p>
            CINERA
          </p>

          <h1>
            My Watchlist
          </h1>

          <span>
            Movies you want to watch later
          </span>

        </div>

        <Heart size={45} />

      </section>

      {movies.length === 0 ? (
        <section className="watchlist-empty">

          <Heart size={55} />

          <h2>
            Your Watchlist is Empty
          </h2>

          <p>
            Start adding movies you want
            to watch later.
          </p>

          <button
            onClick={() =>
              navigate("/")
            }
          >
            Discover Movies
          </button>

        </section>
      ) : (
        <section className="watchlist-grid">

          {movies.map((movie) => (

            <article
              className="watchlist-card"
              key={movie.id}
              onClick={() =>
                navigate(
                  `/movie/${movie.id}`
                )
              }
            >

              <div className="watchlist-poster">

                {movie.poster_path ? (
                  <img
                    src={getPosterUrl(
                      movie.poster_path
                    )}
                    alt={movie.title}
                  />
                ) : (
                  <div>
                    No Image
                  </div>
                )}

                <button
                  className="watchlist-remove"
                  onClick={(event) =>
                    handleRemove(
                      event,
                      movie.id
                    )
                  }
                >
                  <Trash2 size={17} />
                </button>

                <div className="watchlist-rating">
                  ★{" "}
                  {movie.vote_average
                    ? movie.vote_average.toFixed(
                        1
                      )
                    : "N/A"}
                </div>

              </div>

              <div className="watchlist-info">

                <h3>
                  {movie.title}
                </h3>

                <span>
                  {movie.release_date?.slice(
                    0,
                    4
                  ) || "N/A"}
                </span>

              </div>

            </article>

          ))}

        </section>
      )}

    </main>
  );
};

export default Watchlist;
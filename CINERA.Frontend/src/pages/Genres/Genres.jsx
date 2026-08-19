import React from "react";
import { useNavigate } from "react-router-dom";

import "./Genres.css";

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Thriller",
  "War",
  "Western",
  "History",
  "Music",
];

const Genres = () => {
  const navigate = useNavigate();

  return (
    <main className="genres-page">
      <section className="genres-hero">
        <p className="genres-label">CINERA GENRES</p>

        <h1>Explore Genres</h1>

        <p>
          Choose a genre and discover movies
          you might love.
        </p>
      </section>

      <section className="genres-grid">
        {genres.map((genre) => (
          <button
            key={genre}
            className="genre-card"
            onClick={() =>
              navigate(
                `/genre/${encodeURIComponent(genre)}`
              )
            }
          >
            <span>{genre}</span>
            <b>→</b>
          </button>
        ))}
      </section>
    </main>
  );
};

export default Genres;
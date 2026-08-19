import React from "react";
import { useNavigate } from "react-router-dom";

import MovieCard from "../MovieCard/MovieCard";

import "./MovieSection.css";

const MovieSection = ({ title, movies = [] }) => {
  const navigate = useNavigate();

  if (!movies.length) {
    return null;
  }

  const handleViewAll = () => {
    // ==============================
    // TRENDING
    // ==============================

    if (title === "Trending Now") {
      navigate("/browse/trending");
      return;
    }

    // ==============================
    // TOP RATED
    // ==============================

    if (title === "Top Rated") {
      navigate("/browse/top-rated");
      return;
    }

    // ==============================
    // GENRE
    // ==============================

    navigate(
      `/genre/${encodeURIComponent(title)}`
    );
  };

  return (
    <section className="movie-section">

      <div className="movie-section-header">

        <h2>{title}</h2>

        <button
          className="view-all-btn"
          onClick={handleViewAll}
        >
          View All
        </button>

      </div>

      <div className="movie-section-grid">

        {movies.slice(0, 6).map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}

      </div>

    </section>
  );
};

export default MovieSection;
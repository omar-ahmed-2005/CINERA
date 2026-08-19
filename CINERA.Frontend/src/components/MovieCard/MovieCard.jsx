import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const rating =
    movie.tmdbRating || movie.rating || 0;

  return (
    <motion.div
      className="movie-card"
      onClick={handleClick}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
    >

      {/* IMAGE */}

      <div className="movie-image-wrapper">

        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            loading="lazy"
          />
        ) : (
          <div className="movie-image-placeholder">
            No Image
          </div>
        )}

        {/* RATING */}

        <div className="movie-rating">
          <Star
            size={14}
            fill="currentColor"
          />

          <span>
            {Number(rating).toFixed(1)}
          </span>
        </div>

      </div>

      {/* INFO */}

      <div className="movie-info">

        <h3 title={movie.title}>
          {movie.title}
        </h3>

        <div className="movie-meta">

          <span>
            {movie.year}
          </span>

          <span>
            {movie.duration}
          </span>

        </div>

        <p>
          {movie.genres?.join(" • ")}
        </p>

      </div>

    </motion.div>
  );
};

export default MovieCard;
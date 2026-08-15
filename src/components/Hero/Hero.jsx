import React, {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  Play,
  Plus,
  Check,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
} from "../../services/watchlist";

import "./Hero.css";

const Hero = ({ movie }) => {
  const navigate = useNavigate();

  const [inWatchlist, setInWatchlist] =
    useState(false);

  // ==========================================
  // CHECK WATCHLIST
  // ==========================================

  useEffect(() => {
    if (!movie) {
      return;
    }

    const watchlistId =
      movie.tmdbId || movie.id;

    setInWatchlist(
      isInWatchlist(watchlistId)
    );
  }, [movie]);

  // ==========================================
  // WATCHLIST
  // ==========================================

  const handleWatchlist = () => {
    if (!movie) {
      return;
    }

    const watchlistId =
      movie.tmdbId || movie.id;

    // ========================================
    // REMOVE
    // ========================================

    if (inWatchlist) {
      removeFromWatchlist(
        watchlistId
      );

      setInWatchlist(false);

      return;
    }

    // ========================================
    // ADD
    // ========================================

    const watchlistMovie = {
      ...movie,

      id: watchlistId,

      tmdbId:
        movie.tmdbId || movie.id,

      title:
        movie.title || "Unknown Movie",

      poster:
        movie.poster || null,

      poster_path:
        movie.poster_path || null,

      backdrop:
        movie.backdrop || null,

      backdrop_path:
        movie.backdrop_path || null,

      vote_average:
        movie.tmdbRating ||
        movie.rating ||
        0,

      release_date:
        movie.release_date ||
        null,

      overview:
        movie.tmdbOverview ||
        movie.overview ||
        "",

      type:
        movie.type || "movie",
    };

    addToWatchlist(
      watchlistMovie
    );

    setInWatchlist(true);
  };

  // ==========================================
  // EXPLORE MOVIE
  // ==========================================

  const handleExplore = () => {
    if (!movie) {
      return;
    }

    const movieId =
      movie.tmdbId || movie.id;

    navigate(
      `/movie/${movieId}`
    );
  };

  // ==========================================
  // SAFETY
  // ==========================================

  if (!movie) {
    return null;
  }

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${movie.backdrop})`,
      }}
    >

      <div className="hero-overlay"></div>

      <motion.div
        className="hero-content"

        initial={{
          opacity: 0,
          x: -50,
        }}

        animate={{
          opacity: 1,
          x: 0,
        }}

        transition={{
          duration: 0.8,
        }}
      >

        {/* ================================= */}
        {/* LABEL */}
        {/* ================================= */}

        <motion.span
          className="hero-label"

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          transition={{
            delay: 0.2,
          }}
        >
          FEATURED MOVIE
        </motion.span>

        {/* ================================= */}
        {/* TITLE */}
        {/* ================================= */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.3,
            duration: 0.7,
          }}
        >
          {movie.title}
        </motion.h1>

        {/* ================================= */}
        {/* META */}
        {/* ================================= */}

        <motion.div
          className="hero-meta"

          initial={{
            opacity: 0,
            y: 15,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.4,
          }}
        >

          <span>
            {movie.year}
          </span>

          {movie.duration && (
            <span>
              {movie.duration}
            </span>
          )}

          <span>
            ⭐{" "}
            {(
              movie.tmdbRating ||
              movie.rating ||
              0
            ).toFixed
              ? (
                  movie.tmdbRating ||
                  movie.rating ||
                  0
                ).toFixed(1)
              : (
                  movie.tmdbRating ||
                  movie.rating ||
                  0
                )}
          </span>

        </motion.div>

        {/* ================================= */}
        {/* GENRES */}
        {/* ================================= */}

        {movie.genres &&
          movie.genres.length > 0 && (
            <div className="hero-genres">

              {movie.genres.map(
                (genre, index) => (
                  <motion.span
                    key={`${genre}-${index}`}

                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}

                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}

                    transition={{
                      delay:
                        0.5 +
                        index *
                          0.1,
                    }}
                  >
                    {genre}
                  </motion.span>
                )
              )}

            </div>
          )}

        {/* ================================= */}
        {/* OVERVIEW */}
        {/* ================================= */}

        <motion.p
          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          transition={{
            delay: 0.7,
          }}
        >
          {movie.tmdbOverview ||
            movie.overview ||
            "Discover more about this movie on CINERA."}
        </motion.p>

        {/* ================================= */}
        {/* BUTTONS */}
        {/* ================================= */}

        <motion.div
          className="hero-buttons"

          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.8,
          }}
        >

          {/* EXPLORE */}

          <button
            className="hero-primary"
            onClick={handleExplore}
          >
            <Play size={18} />

            Explore Movie
          </button>

          {/* WATCHLIST */}

          <button
            className="hero-secondary"
            onClick={
              handleWatchlist
            }
          >

            {inWatchlist ? (
              <>
                <Check size={18} />

                In Watchlist
              </>
            ) : (
              <>
                <Plus size={18} />

                Watchlist
              </>
            )}

          </button>

        </motion.div>

      </motion.div>

      {/* ================================= */}
      {/* SCROLL */}
      {/* ================================= */}

      <div className="hero-scroll">

        <span>
          SCROLL TO EXPLORE
        </span>

        <div className="scroll-line"></div>

      </div>

    </section>
  );
};

export default Hero;
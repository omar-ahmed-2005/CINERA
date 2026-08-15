import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getMovieDetails,
  getPosterUrl,
  getBackdropUrl,
} from "../../services/tmdb";

import {
  isInWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from "../../services/watchlist";

import MovieCard from "../../components/MovieCard/MovieCard";

import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  const [inWatchlist, setInWatchlist] =
    useState(false);

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      setError(false);

      try {
        const data =
          await getMovieDetails(id);

        setMovie(data);

        setInWatchlist(
          isInWatchlist(data.id)
        );
      } catch (err) {
        console.error(
          "Failed to load movie:",
          err
        );

        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  // =========================
  // WATCHLIST
  // =========================

  const handleWatchlist = () => {
    if (!movie) return;

    if (inWatchlist) {
      removeFromWatchlist(movie.id);

      setInWatchlist(false);
    } else {
      addToWatchlist({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        overview: movie.overview,
      });

      setInWatchlist(true);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="movie-details-loading">
        <h2>Loading...</h2>

        <p>
          Getting movie information
        </p>
      </main>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error || !movie) {
    return (
      <main className="movie-not-found">
        <h1>Movie Not Found</h1>

        <button
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </main>
    );
  }

  // =========================
  // BASIC DATA
  // =========================

  const year =
    movie.release_date?.slice(0, 4) ||
    "N/A";

  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${
        movie.runtime % 60
      }m`
    : "N/A";

  const rating =
    movie.vote_average
      ? movie.vote_average.toFixed(1)
      : "N/A";

  const backdrop =
    getBackdropUrl(movie.backdrop_path);

  const poster =
    getPosterUrl(movie.poster_path);

  // =========================
  // TRAILER
  // =========================

  const trailer =
    movie.videos?.results?.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer"
    );

  // =========================
  // CAST
  // =========================

  const cast =
    movie.credits?.cast?.slice(0, 8) || [];

  // =========================
  // CREW
  // =========================

  const director =
    movie.credits?.crew?.find(
      (person) =>
        person.job === "Director"
    );

  const writers =
    movie.credits?.crew
      ?.filter(
        (person) =>
          person.department ===
            "Writing" ||
          person.job === "Writer" ||
          person.job ===
            "Screenplay"
      )
      ?.slice(0, 5) || [];

  // =========================
  // RECOMMENDATIONS
  // =========================

  const recommendations =
    movie.recommendations?.results
      ?.filter(
        (item) => item.poster_path
      )
      ?.slice(0, 6) || [];

  // =========================
  // SIMILAR
  // =========================

  const similarMovies =
    movie.similar?.results
      ?.filter(
        (item) => item.poster_path
      )
      ?.slice(0, 6) || [];

  // =========================
  // PRODUCTION
  // =========================

  const countries =
    movie.production_countries
      ?.map(
        (country) =>
          country.name
      )
      .join(", ") || "N/A";

  const languages =
    movie.spoken_languages
      ?.map(
        (language) =>
          language.english_name
      )
      .join(", ") || "N/A";

  const companies =
    movie.production_companies
      ?.map(
        (company) =>
          company.name
      )
      .join(" • ") || "N/A";

  // =========================
  // FORMAT MONEY
  // =========================

  const formatMoney = (value) => {
    if (!value) {
      return "N/A";
    }

    return new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }
    ).format(value);
  };

  // =========================
  // REVIEWS
  // =========================

  const reviews =
    movie.reviews?.results
      ?.filter((review) => review.content)
      ?.slice(0, 4) || [];

  // =========================
  // GALLERY
  // =========================

  const gallery =
    movie.images?.backdrops
      ?.filter((image) => image.file_path)
      ?.slice(0, 8) || [];

  // =========================
  // FORMAT RECOMMENDATIONS
  // =========================

  const formatMovie = (item) => ({
    id: item.id,
    tmdbId: item.id,
    title: item.title,
    poster: getPosterUrl(
      item.poster_path
    ),
    backdrop: item.backdrop_path
      ? getBackdropUrl(
          item.backdrop_path
        )
      : null,
    rating:
      item.vote_average || 0,
    tmdbRating:
      item.vote_average || 0,
    overview:
      item.overview || "",
    year:
      item.release_date?.slice(
        0,
        4
      ) || "N/A",
    type: "movie",
    genres: [],
  });

  return (
    <main className="movie-details-page">

      {/* ================================= */}
      {/* HERO */}
      {/* ================================= */}

      <section
        className="movie-details-hero"
        style={{
          backgroundImage: backdrop
            ? `
              linear-gradient(
                90deg,
                #0b0b0f 0%,
                rgba(11,11,15,0.9) 35%,
                rgba(11,11,15,0.45) 75%,
                #0b0b0f 100%
              ),
              linear-gradient(
                0deg,
                #0b0b0f 0%,
                transparent 55%
              ),
              url("${backdrop}")
            `
            : "none",
        }}
      >

        <div className="movie-details-content">

          {/* TEXT */}

          <div className="movie-details-text">

            <p className="movie-details-label">
              CINERA MOVIE
            </p>

            <h1>
              {movie.title}
            </h1>

            {/* TAGLINE */}

            {movie.tagline && (
              <p className="movie-tagline">
                "{movie.tagline}"
              </p>
            )}

            {/* META */}

            <div className="movie-meta">

              <span>
                {year}
              </span>

              <span>
                {runtime}
              </span>

              <span className="movie-rating">
                ★ {rating}
              </span>

              <span>
                {movie.vote_count?.toLocaleString() ||
                  0}{" "}
                votes
              </span>

            </div>

            {/* GENRES */}

            <div className="movie-genres">

              {movie.genres?.map(
                (genre) => (
                  <span
                    key={genre.id}
                  >
                    {genre.name}
                  </span>
                )
              )}

            </div>

            {/* OVERVIEW */}

            <p className="movie-overview">
              {movie.overview ||
                "No description available."}
            </p>

            {/* BUTTONS */}

            <div className="movie-buttons">

              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                  className="movie-trailer-btn"
                >
                  ▶ Watch Trailer
                </a>
              )}

              <button
                className={`movie-watchlist-btn ${
                  inWatchlist
                    ? "active"
                    : ""
                }`}
                onClick={
                  handleWatchlist
                }
              >
                {inWatchlist
                  ? "♥ In Watchlist"
                  : "♡ Add to Watchlist"}
              </button>

              <button
                className="movie-back-btn"
                onClick={() =>
                  navigate(-1)
                }
              >
                ← Back
              </button>

            </div>

          </div>

          {/* POSTER */}

          {poster && (
            <div className="movie-details-poster">

              <img
                src={poster}
                alt={movie.title}
              />

            </div>
          )}

        </div>

      </section>

      {/* ================================= */}
      {/* QUICK STATS */}
      {/* ================================= */}

      <section className="movie-quick-stats">
        <div>
          <span>RATING</span>
          <strong>★ {rating}</strong>
        </div>

        <div>
          <span>VOTES</span>
          <strong>
            {movie.vote_count?.toLocaleString() || "0"}
          </strong>
        </div>

        <div>
          <span>RUNTIME</span>
          <strong>{runtime}</strong>
        </div>

        <div>
          <span>RELEASE</span>
          <strong>{movie.release_date || "N/A"}</strong>
        </div>

        <div>
          <span>STATUS</span>
          <strong>{movie.status || "N/A"}</strong>
        </div>
      </section>

      {/* ================================= */}
      {/* MOVIE INFORMATION */}
      {/* ================================= */}

      <section className="movie-info-section">

        <div className="movie-section-title">

          <p>MOVIE INFORMATION</p>

          <h2>
            Everything About This Movie
          </h2>

        </div>

        <div className="movie-info-grid">

          <div className="movie-info-card">
            <span>Release Date</span>
            <strong>
              {movie.release_date ||
                "N/A"}
            </strong>
          </div>

          <div className="movie-info-card">
            <span>Runtime</span>
            <strong>
              {runtime}
            </strong>
          </div>

          <div className="movie-info-card">
            <span>Budget</span>
            <strong>
              {formatMoney(
                movie.budget
              )}
            </strong>
          </div>

          <div className="movie-info-card">
            <span>Box Office</span>
            <strong>
              {formatMoney(
                movie.revenue
              )}
            </strong>
          </div>

          <div className="movie-info-card">
            <span>Original Language</span>
            <strong>
              {movie.original_language?.toUpperCase() ||
                "N/A"}
            </strong>
          </div>

          <div className="movie-info-card">
            <span>Popularity</span>
            <strong>
              {movie.popularity
                ? movie.popularity.toFixed(
                    1
                  )
                : "N/A"}
            </strong>
          </div>

        </div>

      </section>

      {/* ================================= */}
      {/* TAGLINE */}
      {/* ================================= */}

      {movie.tagline && (
        <section className="movie-tagline-section">

          <span>
            THE STORY
          </span>

          <h2>
            "{movie.tagline}"
          </h2>

        </section>
      )}

      {/* ================================= */}
      {/* CAST */}
      {/* ================================= */}

      {cast.length > 0 && (
        <section className="movie-cast">

          <div className="movie-section-title">

            <p>CAST</p>

            <h2>
              Main Cast
            </h2>

          </div>

          <div className="cast-grid">

            {cast.map(
              (person) => (
                <div
                  className="cast-card"
                  key={person.id}
                >

                  <div className="cast-image">

                    {person.profile_path ? (
                      <img
                        src={getPosterUrl(
                          person.profile_path
                        )}
                        alt={person.name}
                      />
                    ) : (
                      <div className="cast-no-image">
                        {person.name?.charAt(
                          0
                        )}
                      </div>
                    )}

                  </div>

                  <h3>
                    {person.name}
                  </h3>

                  <p>
                    {person.character}
                  </p>

                </div>
              )
            )}

          </div>

        </section>
      )}

      {/* ================================= */}
      {/* CREW */}
      {/* ================================= */}

      <section className="movie-crew-section">

        <div className="movie-section-title">

          <p>CREW</p>

          <h2>
            Behind the Movie
          </h2>

        </div>

        <div className="crew-grid">

          {director && (
            <div className="crew-card">

              <span>
                Director
              </span>

              <strong>
                {director.name}
              </strong>

            </div>
          )}

          {writers.length > 0 && (
            <div className="crew-card">

              <span>
                Writers
              </span>

              <strong>
                {writers
                  .map(
                    (writer) =>
                      writer.name
                  )
                  .join(", ")}
              </strong>

            </div>
          )}

        </div>

      </section>

      {/* ================================= */}
      {/* PRODUCTION */}
      {/* ================================= */}

      <section className="movie-production-section">

        <div className="movie-section-title">

          <p>PRODUCTION</p>

          <h2>
            Production Details
          </h2>

        </div>

        <div className="production-grid">

          <div>
            <span>
              Production Countries
            </span>

            <strong>
              {countries}
            </strong>
          </div>

          <div>
            <span>
              Languages
            </span>

            <strong>
              {languages}
            </strong>
          </div>

          <div>
            <span>
              Production Companies
            </span>

            <strong>
              {companies}
            </strong>
          </div>

        </div>

      </section>

      {/* ================================= */}
      {/* GALLERY */}
      {/* ================================= */}

      {gallery.length > 0 && (
        <section className="movie-gallery-section">
          <div className="movie-section-title">
            <p>GALLERY</p>
            <h2>Inside the Movie</h2>
          </div>

          <div className="movie-gallery-grid">
            {gallery.map((image) => (
              <div
                className="movie-gallery-item"
                key={image.file_path}
              >
                <img
                  src={getBackdropUrl(image.file_path)}
                  alt={`${movie.title} scene`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================================= */}
      {/* REVIEWS */}
      {/* ================================= */}

      {reviews.length > 0 && (
        <section className="movie-reviews-section">
          <div className="movie-section-title">
            <p>REVIEWS</p>
            <h2>What People Think</h2>
          </div>

          <div className="movie-reviews-grid">
            {reviews.map((review) => (
              <article
                className="movie-review-card"
                key={review.id}
              >
                <div className="movie-review-header">
                  <div className="movie-review-avatar">
                    {review.author?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <div>
                    <strong>
                      {review.author || "Anonymous"}
                    </strong>
                    <span>
                      {review.created_at
                        ? new Date(review.created_at).toLocaleDateString()
                        : ""}
                    </span>
                  </div>

                  {review.author_details?.rating && (
                    <b>
                      ★ {review.author_details.rating}/10
                    </b>
                  )}
                </div>

                <p>{review.content}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ================================= */}
      {/* RECOMMENDATIONS */}
      {/* ================================= */}

      {recommendations.length >
        0 && (
        <section className="movie-related-section">

          <div className="movie-section-title">

            <p>RECOMMENDED</p>

            <h2>
              You May Also Like
            </h2>

          </div>

          <div className="movie-related-grid">

            {recommendations.map(
              (item) => (
                <MovieCard
                  key={item.id}
                  movie={formatMovie(
                    item
                  )}
                />
              )
            )}

          </div>

        </section>
      )}

      {/* ================================= */}
      {/* SIMILAR */}
      {/* ================================= */}

      {similarMovies.length > 0 && (
        <section className="movie-related-section">

          <div className="movie-section-title">

            <p>SIMILAR MOVIES</p>

            <h2>
              More Like This
            </h2>

          </div>

          <div className="movie-related-grid">

            {similarMovies.map(
              (item) => (
                <MovieCard
                  key={item.id}
                  movie={formatMovie(
                    item
                  )}
                />
              )
            )}

          </div>

        </section>
      )}

    </main>
  );
};

export default MovieDetails;
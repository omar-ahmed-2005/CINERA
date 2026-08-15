import React, { useEffect, useState } from "react";

import {
  Film,
  Users,
  Heart,
  Star,
  TrendingUp,
  Clapperboard,
} from "lucide-react";

import movies from "../../../data/movies";

import { getWatchlist } from "../../../services/watchlist";

import "./Dashboard.css";

const Dashboard = () => {
  const [watchlistCount, setWatchlistCount] =
    useState(0);

  const [usersCount, setUsersCount] =
    useState(0);

  useEffect(() => {
    // ==============================
    // WATCHLIST
    // ==============================

    const watchlist = getWatchlist();

    setWatchlistCount(watchlist.length);

    // ==============================
    // USERS
    // ==============================

    const savedUsers =
      localStorage.getItem("cineraUsers");

    if (savedUsers) {
      try {
        const users = JSON.parse(savedUsers);

        setUsersCount(
          Array.isArray(users)
            ? users.length
            : 0
        );
      } catch {
        setUsersCount(0);
      }
    } else {
      const currentUser =
        localStorage.getItem("cineraUser");

      setUsersCount(
        currentUser ? 1 : 0
      );
    }
  }, []);

  // ==============================
  // MOVIE STATS
  // ==============================

  const movieCount = movies.length;

  const averageRating =
    movies.length > 0
      ? (
          movies.reduce(
            (total, movie) =>
              total + (movie.rating || 0),
            0
          ) / movies.length
        ).toFixed(1)
      : "0.0";

  const seriesCount =
    movies.filter(
      (movie) =>
        movie.type === "series"
    ).length;

  const movieOnlyCount =
    movies.filter(
      (movie) =>
        movie.type !== "series"
    ).length;

  return (
    <main className="admin-dashboard">

      <div className="dashboard-container">

        {/* ============================== */}
        {/* HEADER */}
        {/* ============================== */}

        <section className="dashboard-header">

          <div>

            <p className="dashboard-label">
              CINERA ADMIN
            </p>

            <h1>
              Dashboard
            </h1>

            <p className="dashboard-description">
              Welcome back. Here's what's
              happening across CINERA.
            </p>

          </div>

          <div className="dashboard-status">

            <span />

            System Active

          </div>

        </section>

        {/* ============================== */}
        {/* STAT CARDS */}
        {/* ============================== */}

        <section className="dashboard-stats">

          {/* MOVIES */}

          <article className="dashboard-stat">

            <div className="dashboard-stat-top">

              <div className="dashboard-stat-icon">
                <Film size={22} />
              </div>

              <span>
                COLLECTION
              </span>

            </div>

            <strong>
              {movieCount}
            </strong>

            <p>
              Total titles
            </p>

          </article>

          {/* USERS */}

          <article className="dashboard-stat">

            <div className="dashboard-stat-top">

              <div className="dashboard-stat-icon">
                <Users size={22} />
              </div>

              <span>
                USERS
              </span>

            </div>

            <strong>
              {usersCount}
            </strong>

            <p>
              Registered users
            </p>

          </article>

          {/* WATCHLIST */}

          <article className="dashboard-stat">

            <div className="dashboard-stat-top">

              <div className="dashboard-stat-icon">
                <Heart size={22} />
              </div>

              <span>
                WATCHLIST
              </span>

            </div>

            <strong>
              {watchlistCount}
            </strong>

            <p>
              Saved titles
            </p>

          </article>

          {/* RATING */}

          <article className="dashboard-stat">

            <div className="dashboard-stat-top">

              <div className="dashboard-stat-icon">
                <Star size={22} />
              </div>

              <span>
                RATING
              </span>

            </div>

            <strong>
              {averageRating}
            </strong>

            <p>
              Average rating
            </p>

          </article>

        </section>

        {/* ============================== */}
        {/* OVERVIEW */}
        {/* ============================== */}

        <section className="dashboard-overview">

          <div className="dashboard-section-title">

            <div>

              <p>
                PLATFORM OVERVIEW
              </p>

              <h2>
                CINERA Collection
              </h2>

            </div>

            <TrendingUp size={22} />

          </div>

          <div className="dashboard-overview-grid">

            {/* MOVIES */}

            <div className="dashboard-overview-card">

              <div className="overview-icon">
                <Clapperboard
                  size={21}
                />
              </div>

              <div>

                <strong>
                  {movieOnlyCount}
                </strong>

                <span>
                  Movies
                </span>

              </div>

            </div>

            {/* SERIES */}

            <div className="dashboard-overview-card">

              <div className="overview-icon">
                <Film size={21} />
              </div>

              <div>

                <strong>
                  {seriesCount}
                </strong>

                <span>
                  TV Shows
                </span>

              </div>

            </div>

            {/* WATCHLIST */}

            <div className="dashboard-overview-card">

              <div className="overview-icon">
                <Heart size={21} />
              </div>

              <div>

                <strong>
                  {watchlistCount}
                </strong>

                <span>
                  Saved titles
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* ============================== */}
        {/* RECENT MOVIES */}
        {/* ============================== */}

        <section className="dashboard-recent">

          <div className="dashboard-section-title">

            <div>

              <p>
                COLLECTION
              </p>

              <h2>
                Featured Titles
              </h2>

            </div>

            <span>
              {movieCount} titles
            </span>

          </div>

          <div className="dashboard-movies">

            {movies
              .slice(0, 6)
              .map((movie) => (

                <div
                  className="dashboard-movie"
                  key={movie.id}
                >

                  <div className="dashboard-movie-poster">

                    {movie.poster ? (
                      <img
                        src={movie.poster}
                        alt={movie.title}
                      />
                    ) : (
                      <Film size={24} />
                    )}

                  </div>

                  <div className="dashboard-movie-info">

                    <strong>
                      {movie.title}
                    </strong>

                    <span>
                      {movie.year ||
                        movie.release_date?.slice(
                          0,
                          4
                        ) ||
                        "N/A"}
                    </span>

                  </div>

                  <div className="dashboard-movie-rating">

                    <Star size={14} />

                    {movie.rating
                      ? movie.rating.toFixed(1)
                      : "N/A"}

                  </div>

                </div>

              ))}

          </div>

        </section>

      </div>

    </main>
  );
};

export default Dashboard;
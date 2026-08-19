import React, { useEffect, useState } from "react";
import {
  Film,
  Users,
  Heart,
  Star,
  TrendingUp,
  Clapperboard,
} from "lucide-react";
import { getDashboardStats, getMovies } from "../../../services/admin";

import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    movieCount: 0,
    usersCount: 0,
    watchlistCount: 0,
    averageRating: 0.0,
    seriesCount: 0,
    movieOnlyCount: 0
  });

  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await getDashboardStats();
        setStats(statsData);

        const moviesData = await getMovies();
        setMoviesList(moviesData);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ==============================
  // MOVIE STATS
  // ==============================

  const movieCount = stats.movieCount;
  const averageRating = Number(stats.averageRating).toFixed(1);
  const seriesCount = stats.seriesCount;
  const movieOnlyCount = stats.movieOnlyCount;
  const watchlistCount = stats.watchlistCount;
  const usersCount = stats.usersCount;

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

            {moviesList
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
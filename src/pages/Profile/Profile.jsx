import React, { useEffect, useState } from "react";

import {
  User,
  Heart,
  Film,
  Settings,
  Search,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { getWatchlist } from "../../services/watchlist";

import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [watchlistCount, setWatchlistCount] =
    useState(0);

  useEffect(() => {
    const movies = getWatchlist();

    setWatchlistCount(movies.length);
  }, []);

  return (
    <main className="profile-page">

      <section className="profile-container">

        {/* PROFILE HEADER */}

        <div className="profile-header">

          <div className="profile-avatar">
            <User size={55} />
          </div>

          <div className="profile-info">

            <p className="profile-label">
              CINERA PROFILE
            </p>

            <h1>
              Welcome to CINERA
            </h1>

            <p>
              Your personal movie space
            </p>

          </div>

        </div>

        {/* STATS */}

        <div className="profile-stats">

          <div className="profile-stat">

            <Heart size={24} />

            <div>

              <strong>
                {watchlistCount}
              </strong>

              <span>
                Watchlist
              </span>

            </div>

          </div>

          <div className="profile-stat">

            <Film size={24} />

            <div>

              <strong>
                CINERA
              </strong>

              <span>
                Movie Collection
              </span>

            </div>

          </div>

          <div className="profile-stat">

            <Settings size={24} />

            <div>

              <strong>
                Active
              </strong>

              <span>
                Account Status
              </span>

            </div>

          </div>

        </div>

        {/* ACTIONS */}

        <section className="profile-actions">

          <h2>
            Quick Actions
          </h2>

          <div className="profile-actions-grid">

            {/* WATCHLIST */}

            <button
              onClick={() =>
                navigate("/watchlist")
              }
            >

              <Heart size={22} />

              <div>

                <strong>
                  My Watchlist
                </strong>

                <span>
                  View your saved movies
                </span>

              </div>

              <b>→</b>

            </button>

            {/* DISCOVER */}

            <button
              onClick={() =>
                navigate("/discover")
              }
            >

              <Film size={22} />

              <div>

                <strong>
                  Discover Movies
                </strong>

                <span>
                  Find something new to watch
                </span>

              </div>

              <b>→</b>

            </button>

            {/* SEARCH */}

            <button
              onClick={() =>
                navigate("/search")
              }
            >

              <Search size={22} />

              <div>

                <strong>
                  Search
                </strong>

                <span>
                  Search movies and TV shows
                </span>

              </div>

              <b>→</b>

            </button>

            {/* SETTINGS */}

            <button
              onClick={() =>
                navigate("/settings")
              }
            >

              <Settings size={22} />

              <div>

                <strong>
                  Settings
                </strong>

                <span>
                  Manage your CINERA account
                </span>

              </div>

              <b>→</b>

            </button>

          </div>

        </section>

      </section>

    </main>
  );
};

export default Profile;
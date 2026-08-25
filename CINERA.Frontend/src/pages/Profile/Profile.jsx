import React, { useEffect, useState } from "react";
import {
  User,
  Heart,
  Film,
  Settings,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../services/auth";

import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [watchlistCount, setWatchlistCount] = useState(0);
  const [accountStatus, setAccountStatus] = useState("Active");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data.user);
        setWatchlistCount(data.watchlistCount);
        setAccountStatus(data.accountStatus);
      } catch (err) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

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
              Welcome, {user?.name || "CINERA User"}
            </h1>

            <p>
              {user?.email || "Your personal movie space"}
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
                {accountStatus}
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
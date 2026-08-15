import React, { useEffect, useState } from "react";

import {
  User,
  Bell,
  Moon,
  LogOut,
  Trash2,
  ChevronLeft,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { clearWatchlist } from "../../services/watchlist";

import "./Settings.css";

const Settings = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [notifications, setNotifications] =
    useState(true);

  const [darkMode, setDarkMode] =
    useState(true);

  // ==============================
  // LOAD SETTINGS
  // ==============================

  useEffect(() => {
    const savedUser =
      localStorage.getItem("cineraUser");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(null);
      }
    }

    const savedNotifications =
      localStorage.getItem(
        "cineraNotifications"
      );

    const savedDarkMode =
      localStorage.getItem(
        "cineraDarkMode"
      );

    if (savedNotifications !== null) {
      setNotifications(
        savedNotifications === "true"
      );
    }

    if (savedDarkMode !== null) {
      setDarkMode(
        savedDarkMode === "true"
      );
    }
  }, []);

  // ==============================
  // APPLY DARK MODE
  // ==============================

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add(
        "cinera-dark"
      );

      document.body.classList.remove(
        "cinera-light"
      );
    } else {
      document.body.classList.add(
        "cinera-light"
      );

      document.body.classList.remove(
        "cinera-dark"
      );
    }
  }, [darkMode]);

  // ==============================
  // NOTIFICATIONS
  // ==============================

  const toggleNotifications = () => {
    const value = !notifications;

    setNotifications(value);

    localStorage.setItem(
      "cineraNotifications",
      String(value)
    );
  };

  // ==============================
  // DARK MODE
  // ==============================

  const toggleDarkMode = () => {
    const value = !darkMode;

    setDarkMode(value);

    localStorage.setItem(
      "cineraDarkMode",
      String(value)
    );
  };

  // ==============================
  // LOGOUT
  // ==============================

  const handleLogout = () => {
    localStorage.removeItem(
      "cineraUser"
    );

    navigate("/login");
  };

  // ==============================
  // CLEAR WATCHLIST
  // ==============================

  const handleClearWatchlist = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear your watchlist?"
    );

    if (!confirmed) {
      return;
    }

    clearWatchlist();

    window.location.reload();
  };

  // ==============================
  // RENDER
  // ==============================

  return (
    <main className="settings-page">

      <section className="settings-container">

        {/* HEADER */}

        <div className="settings-header">

          <button
            className="settings-back"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={18} />

            Back
          </button>

          <p className="settings-label">
            CINERA SETTINGS
          </p>

          <h1>
            Settings
          </h1>

          <p>
            Manage your CINERA experience.
          </p>

        </div>

        {/* ACCOUNT */}

        <section className="settings-section">

          <div className="settings-section-title">

            <User size={20} />

            <div>

              <h2>
                Account
              </h2>

              <p>
                Your account information
              </p>

            </div>

          </div>

          <div className="settings-card">

            <div className="settings-user">

              <div className="settings-avatar">
                <User size={25} />
              </div>

              <div>

                <strong>
                  {user?.name ||
                    "CINERA User"}
                </strong>

                <span>
                  {user?.email ||
                    "Not signed in"}
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* PREFERENCES */}

        <section className="settings-section">

          <div className="settings-section-title">

            <Bell size={20} />

            <div>

              <h2>
                Preferences
              </h2>

              <p>
                Customize your experience
              </p>

            </div>

          </div>

          <div className="settings-card">

            {/* NOTIFICATIONS */}

            <div className="settings-row">

              <div className="settings-row-info">

                <Bell size={20} />

                <div>

                  <strong>
                    Notifications
                  </strong>

                  <span>
                    Receive CINERA updates
                  </span>

                </div>

              </div>

              <button
                className={`settings-toggle ${
                  notifications
                    ? "active"
                    : ""
                }`}
                onClick={
                  toggleNotifications
                }
                aria-label="Toggle notifications"
              >
                <span />
              </button>

            </div>

            {/* DARK MODE */}

            <div className="settings-row">

              <div className="settings-row-info">

                <Moon size={20} />

                <div>

                  <strong>
                    Dark Mode
                  </strong>

                  <span>
                    Use the dark CINERA theme
                  </span>

                </div>

              </div>

              <button
                className={`settings-toggle ${
                  darkMode
                    ? "active"
                    : ""
                }`}
                onClick={
                  toggleDarkMode
                }
                aria-label="Toggle dark mode"
              >
                <span />
              </button>

            </div>

          </div>

        </section>

        {/* WATCHLIST */}

        <section className="settings-section">

          <div className="settings-section-title">

            <Trash2 size={20} />

            <div>

              <h2>
                Watchlist
              </h2>

              <p>
                Manage your saved movies
              </p>

            </div>

          </div>

          <div className="settings-card">

            <button
              className="settings-danger"
              onClick={
                handleClearWatchlist
              }
            >

              <Trash2 size={20} />

              <div>

                <strong>
                  Clear Watchlist
                </strong>

                <span>
                  Remove all saved movies
                </span>

              </div>

            </button>

          </div>

        </section>

        {/* LOGOUT */}

        <section className="settings-section">

          <div className="settings-card">

            <button
              className="settings-logout"
              onClick={handleLogout}
            >

              <LogOut size={20} />

              Sign Out

            </button>

          </div>

        </section>

      </section>

    </main>
  );
};

export default Settings;
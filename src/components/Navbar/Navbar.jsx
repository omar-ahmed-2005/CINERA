import React, { useState } from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  Search,
  Heart,
  User,
  Settings,
  Menu,
  X,
} from "lucide-react";

import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">

      {/* LOGO */}

      <button
        className="navbar-logo"
        onClick={() => goTo("/")}
      >
        CINERA
      </button>

      {/* LINKS */}

      <div
        className={`navbar-links ${
          menuOpen ? "active" : ""
        }`}
      >

        <button
          className={
            isActive("/")
              ? "nav-link active"
              : "nav-link"
          }
          onClick={() => goTo("/")}
        >
          Home
        </button>

        <button
          className={
            isActive("/discover")
              ? "nav-link active"
              : "nav-link"
          }
          onClick={() => goTo("/discover")}
        >
          Discover
        </button>

        <button
          className={
            location.pathname.startsWith(
              "/genre"
            )
              ? "nav-link active"
              : "nav-link"
          }
          onClick={() => goTo("/genres")}
        >
          Genres
        </button>

        <button
          className={
            location.pathname ===
              "/browse/trending"
              ? "nav-link active"
              : "nav-link"
          }
          onClick={() =>
            goTo("/browse/trending")
          }
        >
          Trending
        </button>

      </div>

      {/* ACTIONS */}

      <div className="navbar-actions">

        {/* SEARCH */}

        <button
          className="nav-action"
          aria-label="Search"
          onClick={() =>
            goTo("/search")
          }
        >
          <Search size={20} />
        </button>

        {/* WATCHLIST */}

        <button
          className="nav-action"
          aria-label="Watchlist"
          onClick={() =>
            goTo("/watchlist")
          }
        >
          <Heart size={20} />
        </button>

        {/* PROFILE */}

        <button
          className="nav-action"
          aria-label="Profile"
          onClick={() => {
            const user =
              localStorage.getItem(
                "cineraUser"
              );

            if (user) {
              goTo("/profile");
            } else {
              goTo("/login");
            }
          }}
        >
          <User size={20} />
        </button>

        {/* SETTINGS */}

        <button
          className="nav-action"
          aria-label="Settings"
          onClick={() =>
            goTo("/settings")
          }
        >
          <Settings size={20} />
        </button>

        {/* MOBILE MENU */}

        <button
          className="menu-button"
          aria-label="Menu"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          {menuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

      </div>

    </nav>
  );
};

export default Navbar;
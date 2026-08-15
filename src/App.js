import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import Home from "./pages/Home/Home";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Discover from "./pages/Discover/Discover";
import Genre from "./pages/Genre/Genre";
import Search from "./pages/Search/Search";
import Watchlist from "./pages/Watchlist/Watchlist";
import Profile from "./pages/Profile/Profile";
import Browse from "./pages/Browse/Browse";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Settings from "./pages/Settings/Settings";
import GenresPage from "./pages/Genres/Genres";

// ADMIN
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import AdminLayout from "./pages/Admin/Layout/AdminLayout";
import Movies from "./pages/Admin/Movies/Movies";
import Genres from "./pages/Admin/Genres/Genres";
import Reviews from "./pages/Admin/Reviews/Reviews";
import Users from "./pages/Admin/Users/Users";

function App() {
  return (
    <BrowserRouter>

      {/* SCROLL TO TOP ON EVERY PAGE */}

      <ScrollToTop />

      <Navbar />

      <Routes>

        {/* ============================== */}
        {/* PUBLIC PAGES */}
        {/* ============================== */}

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* DISCOVER */}

        <Route
          path="/discover"
          element={<Discover />}
        />
        <Route
          path="/genres"
          element={<GenresPage />}
        />
        {/* SEARCH */}

        <Route
          path="/search"
          element={<Search />}
        />

        {/* MOVIE DETAILS */}

        <Route
          path="/movie/:id"
          element={<MovieDetails />}
        />

        {/* GENRE */}

        <Route
          path="/genre/:genreName"
          element={<Genre />}
        />

        {/* WATCHLIST */}

        <Route
          path="/watchlist"
          element={<Watchlist />}
        />

        {/* PROFILE */}

        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* ============================== */}
        {/* BROWSE */}
        {/* ============================== */}

        {/* TRENDING */}

        <Route
          path="/browse/trending"
          element={<Browse />}
        />

        {/* TOP RATED */}

        <Route
          path="/browse/top-rated"
          element={<Browse />}
        />

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* SETTINGS */}

        <Route
          path="/settings"
          element={<Settings />}
        />

        {/* ============================== */}
        {/* ADMIN */}
        {/* ============================== */}

        <Route
          path="/admin"
          element={<AdminLayout />}
        >

          {/* DASHBOARD */}

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          {/* MOVIES */}

          <Route
            path="movies"
            element={<Movies />}
          />

          {/* GENRES */}

          <Route
            path="genres"
            element={<Genres />}
          />

          {/* REVIEWS */}

          <Route
            path="reviews"
            element={<Reviews />}
          />

          {/* USERS */}

          <Route
            path="users"
            element={<Users />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
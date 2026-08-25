import React, { useEffect, useState } from "react";

import movies from "../../data/movies";

import Hero from "../../components/Hero/Hero";
import MovieSection from "../../components/MovieSection/MovieSection";

import {
  searchMovie,
  searchTV,
  getPosterUrl,
  getBackdropUrl,
  getPopularMovies,
  getTopRatedMovies,
  getDiscoverMovies,
} from "../../services/tmdb";

const Home = () => {
  const [heroMovies, setHeroMovies] =
    useState([]);

  const [sections, setSections] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ==============================
  // LOCAL MOVIE → TMDB DATA
  // ==============================

  const getLocalMovieData = async (
    movie
  ) => {
    try {
      let result;

      if (movie.type === "series") {
        result = await searchTV(
          movie.title
        );
      } else {
        result = await searchMovie(
          movie.title
        );
      }

      return {
        ...movie,

        poster: result?.poster_path
          ? getPosterUrl(
              result.poster_path
            )
          : null,

        backdrop: result?.backdrop_path
          ? getBackdropUrl(
              result.backdrop_path
            )
          : null,

        tmdbId: result?.id || null,

        tmdbRating:
          result?.vote_average ??
          movie.rating,

        tmdbOverview:
          result?.overview ||
          movie.overview,
      };
    } catch (error) {
      console.error(
        `Failed to load ${movie.title}:`,
        error
      );

      return {
        ...movie,
        poster: null,
        backdrop: null,
      };
    }
  };

  // ==============================
  // TMDB MOVIES → CINERA FORMAT
  // ==============================

  const formatTMDBMovies = (
    results = []
  ) => {
    return results
      .filter(
        (movie) => movie.poster_path
      )
      .map((movie) => ({
        id: movie.id,

        tmdbId: movie.id,

        title: movie.title,

        year:
          movie.release_date?.slice(
            0,
            4
          ) || "N/A",

        rating:
          movie.vote_average || 0,

        tmdbRating:
          movie.vote_average || 0,

        overview:
          movie.overview || "",

        poster: getPosterUrl(
          movie.poster_path
        ),

        backdrop: movie.backdrop_path
          ? getBackdropUrl(
              movie.backdrop_path
            )
          : null,

        type: "movie",

        genres: [],
      }));
  };

  // ==============================
  // LOAD HOME
  // ==============================

  useEffect(() => {
    const loadHome = async () => {
      try {
        setLoading(true);

        // ==============================
        // HERO
        // ==============================

        const localResults =
          await Promise.all(
            movies
              .slice(0, 10)
              .map(getLocalMovieData)
          );

        setHeroMovies(
          localResults.filter(
            (movie) => movie.poster
          )
        );

        // ==============================
        // LOAD SECTIONS
        // ==============================

        const [
          trendingData,
          topRatedData,
          actionData,
          sciFiData,
          comedyData,
          horrorData,
          dramaData,
          thrillerData,
          romanceData,
          adventureData,
        ] = await Promise.all([
          getPopularMovies(1),

          getTopRatedMovies(1),

          getDiscoverMovies(28, 1),

          getDiscoverMovies(878, 1),

          getDiscoverMovies(35, 1),

          getDiscoverMovies(27, 1),

          getDiscoverMovies(18, 1),

          getDiscoverMovies(53, 1),

          getDiscoverMovies(10749, 1),

          getDiscoverMovies(12, 1),
        ]);

        setSections([
          {
            title: "Trending Now",
            movies:
              formatTMDBMovies(
                trendingData?.results
              ).slice(0, 10),
          },

          {
            title: "Top Rated",
            movies:
              formatTMDBMovies(
                topRatedData?.results
              ).slice(0, 10),
          },

          {
            title: "Action",
            movies:
              formatTMDBMovies(
                actionData?.results
              ).slice(0, 10),
          },

          {
            title: "Science Fiction",
            movies:
              formatTMDBMovies(
                sciFiData?.results
              ).slice(0, 10),
          },

          {
            title: "Comedy",
            movies:
              formatTMDBMovies(
                comedyData?.results
              ).slice(0, 10),
          },

          {
            title: "Horror",
            movies:
              formatTMDBMovies(
                horrorData?.results
              ).slice(0, 10),
          },

          {
            title: "Drama",
            movies:
              formatTMDBMovies(
                dramaData?.results
              ).slice(0, 10),
          },

          {
            title: "Thriller",
            movies:
              formatTMDBMovies(
                thrillerData?.results
              ).slice(0, 10),
          },

          {
            title: "Romance",
            movies:
              formatTMDBMovies(
                romanceData?.results
              ).slice(0, 10),
          },

          {
            title: "Adventure",
            movies:
              formatTMDBMovies(
                adventureData?.results
              ).slice(0, 10),
          },
        ]);
      } catch (error) {
        console.error(
          "Failed to load CINERA Home:",
          error
        );

        // ==============================
        // FALLBACK
        // ==============================

        try {
          const fallback =
            await Promise.all(
              movies
                .map(getLocalMovieData)
            );

          setHeroMovies(
            fallback.filter(
              (movie) =>
                movie.poster
            )
          );
        } catch (fallbackError) {
          console.error(
            "Fallback error:",
            fallbackError
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadHome();
  }, []);

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="loading-screen">
        <h2>
          Loading CINERA...
        </h2>

        <p>
          Discovering movies for you
        </p>
      </div>
    );
  }

  // ==============================
  // HERO
  // ==============================

  const heroMovie =
    heroMovies.find(
      (movie) => movie.backdrop
    ) ||
    heroMovies[0];

  return (
    <main className="home">

      {/* ============================== */}
      {/* HERO */}
      {/* ============================== */}

      {heroMovie && (
        <Hero movie={heroMovie} />
      )}

      {/* ============================== */}
      {/* MOVIE SECTIONS */}
      {/* ============================== */}

      {sections.map(
        (section) =>
          section.movies.length > 0 && (
            <MovieSection
              key={section.title}
              title={section.title}
              movies={section.movies}
            />
          )
      )}

    </main>
  );
};

export default Home;
const TOKEN =
  process.env.REACT_APP_TMDB_API_KEY ||
  process.env.REACT_APP_TMDB_TOKEN;

const BASE_URL =
  "https://api.themoviedb.org/3";

// ==============================
// REQUEST
// ==============================

const request = async (endpoint) => {
  if (!TOKEN) {
    throw new Error(
      "TMDB token is missing"
    );
  }

  const response = await fetch(
    `${BASE_URL}${endpoint}`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${TOKEN}`,
        accept: "application/json",
      },
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    console.error(
      "TMDB ERROR:",
      data
    );

    throw new Error(
      data.status_message ||
        `TMDB Error ${response.status}`
    );
  }

  return data;
};

// ==============================
// SEARCH MOVIES
// ==============================

export const searchMovies = async (
  query
) => {
  const data = await request(
    `/search/movie?query=${encodeURIComponent(
      query
    )}&language=en-US&page=1&include_adult=false`
  );

  return data.results || [];
};

// ==============================
// SEARCH TV
// ==============================

export const searchTVShows = async (
  query
) => {
  const data = await request(
    `/search/tv?query=${encodeURIComponent(
      query
    )}&language=en-US&page=1&include_adult=false`
  );

  return data.results || [];
};

// ==============================
// SEARCH ONE MOVIE
// ==============================

export const searchMovie = async (
  title
) => {
  const data = await request(
    `/search/movie?query=${encodeURIComponent(
      title
    )}&language=en-US`
  );

  return (
    data.results?.[0] || null
  );
};

// ==============================
// SEARCH ONE TV
// ==============================

export const searchTV = async (
  title
) => {
  const data = await request(
    `/search/tv?query=${encodeURIComponent(
      title
    )}&language=en-US`
  );

  return (
    data.results?.[0] || null
  );
};

// ==============================
// MOVIE DETAILS
// ==============================

export const getMovieDetails =
  async (id) => {
    return await request(
      `/movie/${id}?language=en-US&append_to_response=credits,videos,reviews,images,recommendations,similar`
    );
  };

// ==============================
// TV DETAILS
// ==============================

export const getTVDetails =
  async (id) => {
    return await request(
      `/tv/${id}?language=en-US&append_to_response=credits,videos,reviews,images,recommendations,similar`
    );
  };

// ==============================
// IMAGE URLS
// ==============================

export const getPosterUrl = (
  path
) => {
  if (!path) {
    return null;
  }

  return `https://image.tmdb.org/t/p/w500${path}`;
};

export const getBackdropUrl = (
  path
) => {
  if (!path) {
    return null;
  }

  return `https://image.tmdb.org/t/p/original${path}`;
};

// ==============================
// POPULAR MOVIES
// ==============================

export const getPopularMovies =
  async (page = 1) => {
    return await request(
      `/movie/popular?language=en-US&page=${page}`
    );
  };

// ==============================
// TOP RATED MOVIES
// ==============================

export const getTopRatedMovies =
  async (page = 1) => {
    return await request(
      `/movie/top_rated?language=en-US&page=${page}`
    );
  };

// ==============================
// NOW PLAYING MOVIES
// ==============================

export const getNowPlayingMovies =
  async (page = 1) => {
    return await request(
      `/movie/now_playing?language=en-US&page=${page}`
    );
  };

// ==============================
// UPCOMING MOVIES
// ==============================

export const getUpcomingMovies =
  async (page = 1) => {
    return await request(
      `/movie/upcoming?language=en-US&page=${page}`
    );
  };

// ==============================
// POPULAR TV
// ==============================

export const getPopularTV =
  async (page = 1) => {
    return await request(
      `/tv/popular?language=en-US&page=${page}`
    );
  };

// ==============================
// TOP RATED TV
// ==============================

export const getTopRatedTV =
  async (page = 1) => {
    return await request(
      `/tv/top_rated?language=en-US&page=${page}`
    );
  };

// ==============================
// GET MOVIE GENRES
// ==============================

export const getMovieGenres =
  async () => {
    return await request(
      "/genre/movie/list?language=en-US"
    );
  };

// ==============================
// MOVIES BY GENRE
// ==============================

export const getMoviesByGenre =
  async (
    genreId,
    page = 1
  ) => {
    return await request(
      `/discover/movie?with_genres=${genreId}&language=en-US&page=${page}&sort_by=popularity.desc`
    );
  };

// ==============================
// TRENDING MOVIES
// ==============================

export const getTrendingMovies =
  async (
    timeWindow = "week",
    page = 1
  ) => {
    return await request(
      `/trending/movie/${timeWindow}?language=en-US&page=${page}`
    );
  };

// ==============================
// DISCOVER MOVIES
// ==============================

export const getDiscoverMovies =
  async (
    genreId = "",
    page = 1
  ) => {
    let endpoint =
      `/discover/movie?language=en-US&page=${page}&sort_by=popularity.desc`;

    if (genreId) {
      endpoint +=
        `&with_genres=${genreId}`;
    }

    return await request(
      endpoint
    );
  };
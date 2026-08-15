const WATCHLIST_KEY = "cinera_watchlist";

// ==============================
// GET WATCHLIST
// ==============================

export const getWatchlist = () => {
  try {
    const saved =
      localStorage.getItem(WATCHLIST_KEY);

    return saved
      ? JSON.parse(saved)
      : [];
  } catch (error) {
    console.error(
      "Failed to load watchlist:",
      error
    );

    return [];
  }
};

// ==============================
// ADD MOVIE
// ==============================

export const addToWatchlist = (movie) => {
  const currentList =
    getWatchlist();

  const alreadyExists =
    currentList.some(
      (item) =>
        item.id === movie.id
    );

  if (alreadyExists) {
    return currentList;
  }

  const newList = [
    ...currentList,
    movie,
  ];

  localStorage.setItem(
    WATCHLIST_KEY,
    JSON.stringify(newList)
  );

  return newList;
};

// ==============================
// REMOVE MOVIE
// ==============================

export const removeFromWatchlist = (
  movieId
) => {
  const currentList =
    getWatchlist();

  const newList =
    currentList.filter(
      (movie) =>
        movie.id !== movieId
    );

  localStorage.setItem(
    WATCHLIST_KEY,
    JSON.stringify(newList)
  );

  return newList;
};

// ==============================
// CHECK MOVIE
// ==============================

export const isInWatchlist = (
  movieId
) => {
  const currentList =
    getWatchlist();

  return currentList.some(
    (movie) =>
      movie.id === movieId
  );
};

// ==============================
// TOGGLE MOVIE
// ==============================

export const toggleWatchlist = (
  movie
) => {
  if (
    isInWatchlist(movie.id)
  ) {
    return removeFromWatchlist(
      movie.id
    );
  }

  return addToWatchlist(movie);
};

// ==============================
// CLEAR WATCHLIST
// ==============================

export const clearWatchlist = () => {
  localStorage.removeItem(
    WATCHLIST_KEY
  );

  return [];
};
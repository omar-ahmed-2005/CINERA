import api from "./api";

// Fetch dashboard statistics
export const getDashboardStats = async () => {
  const response = await api.get("/admin/dashboard/stats");
  return response.data;
};

// Fetch all movies in system
export const getMovies = async () => {
  const response = await api.get("/admin/movies");
  return response.data;
};

// Delete a movie by ID
export const deleteMovie = async (id) => {
  const response = await api.delete(`/admin/movies/${id}`);
  return response.data;
};

// Fetch all registered users
export const getUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

// Delete a user by Email
export const deleteUser = async (email) => {
  const response = await api.delete(`/admin/users/${email}`);
  return response.data;
};

// Fetch all user reviews
export const getReviews = async () => {
  const response = await api.get("/admin/reviews");
  return response.data;
};

// Delete a review by ID
export const deleteReview = async (id) => {
  const response = await api.delete(`/admin/reviews/${id}`);
  return response.data;
};

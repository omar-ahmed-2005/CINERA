import axios from "axios";

const API_BASE_URL = "https://localhost:44309/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to inject JWT token into requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("cineraToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle unauthorized errors globally (optional, e.g. redirect to login)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear invalid token/user
      localStorage.removeItem("cineraToken");
      localStorage.removeItem("cineraUser");
    }
    return Promise.reject(error);
  }
);

export default api;

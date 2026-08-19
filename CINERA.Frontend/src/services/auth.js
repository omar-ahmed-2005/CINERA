import api from "./api";

// Register user (requires email verification)
export const register = async (name, email, password) => {
  const response = await api.post("/auth/register", { name, email, password });
  return response.data; // { requiresVerification: true, email: "..." }
};

// Verify code and get JWT token
export const verify = async (email, code) => {
  const response = await api.post("/auth/verify", { email, code });
  const { token, user } = response.data;
  
  if (token && user) {
    localStorage.setItem("cineraToken", token);
    localStorage.setItem("cineraUser", JSON.stringify(user));
  }
  
  return response.data;
};

// Login user and get JWT token
export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  const { token, user } = response.data;
  
  if (token && user) {
    localStorage.setItem("cineraToken", token);
    localStorage.setItem("cineraUser", JSON.stringify(user));
  }
  
  return response.data;
};

// Fetch current user profile details
export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data; // { user, watchlistCount, accountStatus, createdAt }
};

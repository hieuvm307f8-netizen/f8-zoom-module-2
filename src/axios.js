import axios, { Axios } from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let refreshPromise = null;

const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

const getNewToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) throw new Error("No refresh token");

    const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Unauthorized");
    }
    return response.json();
  } catch (error) {
    return null; 
  }
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      if (!refreshPromise) {
        refreshPromise = getNewToken();
      }

      const newToken = await refreshPromise;
      
      refreshPromise = null; 

      if (newToken && newToken.accessToken) {
        localStorage.setItem("access_token", newToken.accessToken);
        localStorage.setItem("refresh_token", newToken.refreshToken);
        
        originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`;
        return instance(originalRequest);
      } else {
        logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
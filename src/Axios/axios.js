import axios from "axios";

export const instance = axios.create({
    baseURL: `https://youtube-music.f8team.dev/api`,
    headers: {
    "Content-Type": "application/json",
  },
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
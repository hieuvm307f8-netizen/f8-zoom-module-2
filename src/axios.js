import axios, { Axios } from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
});

// Request Interceptor
instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Logic Refresh Token
let refreshPromise = null;

const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  // Có thể thêm logic redirect về trang login tại đây
  window.location.href = '/login'; 
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
    return null; // Trả về null nếu lỗi để logic bên dưới xử lý logout
  }
};

// Response Interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra lỗi 401 và đảm bảo chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu đã retry để tránh vòng lặp vô hạn

      if (!refreshPromise) {
        refreshPromise = getNewToken();
      }

      const newToken = await refreshPromise;
      
      // Reset promise để lần 401 tiếp theo có thể gọi lại
      refreshPromise = null; 

      if (newToken && newToken.accessToken) {
        // Lưu token mới (API thường trả về accessToken và refreshToken)
        localStorage.setItem("access_token", newToken.accessToken);
        localStorage.setItem("refresh_token", newToken.refreshToken);
        
        // Cập nhật header cho request bị lỗi và gọi lại
        originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`;
        return instance(originalRequest);
      } else {
        // Refresh thất bại -> Logout
        logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
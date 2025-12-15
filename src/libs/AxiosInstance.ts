import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
});

// request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// response interceptor
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const isReissue = originalRequest.url?.includes("/api/auth/reissue");

    if (
      error.response?.status === 401 &&
      !isReissue &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const res = await api.post("/api/auth/reissue");
      const newToken = res.headers["authorization"]
        ?.replace("Bearer ", "")
        .trim();

      if (newToken) {
        localStorage.setItem("accessToken", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
      }

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
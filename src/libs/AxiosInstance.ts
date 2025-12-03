import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
});

// 요청 인터셉터
api.interceptors.request.use(
    (config) => {
        // 요청 보내기 직전에 실행됨
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("accessToken");
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config;
    },
    (error) => {
        // 요청 설정 중 에러
        return Promise.reject(error);
    }
);

// 응답 인터셉터
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await api.post("/api/auth/reissue");

                const newAccessToken = res.headers["authorization"];

                if (newAccessToken) {
                    localStorage.setItem("accessToken", newAccessToken);
                }

                originalRequest.headers.Authorization = newAccessToken;

                return api(originalRequest);
            } catch (refreshError) {
                console.error("리프레시 토큰 만료됨 → 로그아웃 처리 필요");
                localStorage.removeItem("accessToken");
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
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

            if (config.url?.includes("/api/auth/reissue")) {
                return config;
            }

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

        // 401이면서 이미 retry하지 않은 경우
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {

                // reissue 호출 (Authorization 헤더 없이)
                const res = await api.post("/api/auth/reissue");

                const rawToken = res.headers["authorization"];
                const newToken = rawToken?.replace("Bearer ", "").trim();

                if (newToken) {
                    localStorage.setItem("accessToken", newToken);
                }

                // 기존 요청의 Authorization 덮어쓰기
                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                // 기존 요청 다시 실행
                return api(originalRequest);

            } catch (refreshError) {
                console.error("리프레시 토큰 만료됨 → 로그아웃 필요");
                localStorage.removeItem("accessToken");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
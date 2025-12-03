import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // 요청 보내기 직전에 실행됨
    return config;
  },
  (error) => {
    // 요청 설정 중 에러
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    // 응답(200~299) 도착 시 실행
    return response;
  },
  (error) => {
    // 에러 응답(4xx, 5xx) 도착 시 실행
    return Promise.reject(error);
  }
);

export default api;
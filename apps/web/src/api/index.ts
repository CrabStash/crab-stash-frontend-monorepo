import { API_ENDPOINTS } from "@app/constants/apiEndpoints";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

const TOKEN_KEY = "token";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }

  return config;
});

createAuthRefreshInterceptor(api, (failedRequest) => {
  const refreshToken = localStorage.getItem(TOKEN_KEY);

  return axios
    .post(`${BASE_URL}${API_ENDPOINTS.auth.refresh}`, {
      token: refreshToken,
    })
    .then(({ data }) => {
      localStorage.setItem(TOKEN_KEY, data.token);
      failedRequest.response.config.headers["Authorization"] = "Bearer " + data.token;

      return Promise.resolve();
    });
});

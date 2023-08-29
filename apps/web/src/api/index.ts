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
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }

  return config;
});

createAuthRefreshInterceptor(api, async (failedRequest) => {
  const { data } = await api.get(API_ENDPOINTS.auth.refresh, {
    withCredentials: true,
  });

  localStorage.setItem(TOKEN_KEY, data.token);
  failedRequest.response.config.headers["Authorization"] = "Bearer " + data.token;

  return Promise.resolve();
});

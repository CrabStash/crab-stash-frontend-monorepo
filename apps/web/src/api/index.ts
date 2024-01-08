import type { GetServerSidePropsContext } from "next";

import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import { COOKIES_AUTH_TOKEN_KEY } from "@app/constants/tokens";
import { storeAuthTokens } from "@app/utils/tokens";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import nookies from "nookies";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/";

let context: GetServerSidePropsContext | null = null;

export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

export const TOKEN_KEY = "token";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const isServer = typeof window === "undefined";

  let token: string | null = null;

  if (!isServer) {
    token = localStorage.getItem(TOKEN_KEY);
  } else {
    const cookies = nookies.get(context);

    token = cookies[COOKIES_AUTH_TOKEN_KEY];
  }

  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
    config.headers["Cookie"] = `${COOKIES_AUTH_TOKEN_KEY}=${token}`;
  }

  return config;
});

const endpointsWithoutAuth = [API_ENDPOINTS.auth.login, API_ENDPOINTS.auth.register];

createAuthRefreshInterceptor(api, async (failedRequest) => {
  const failedRequestUrl = failedRequest.config.url;

  if (endpointsWithoutAuth.includes(failedRequestUrl)) {
    return Promise.reject(failedRequest);
  }

  const { data } = await api.get<{ token: string }>(API_ENDPOINTS.auth.refresh, {
    withCredentials: true,
  });

  storeAuthTokens(null, data);
  failedRequest.response.config.headers["Authorization"] = "Bearer " + data.token;

  return Promise.resolve();
});

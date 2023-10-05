import type { GetServerSidePropsContext } from "next";

import { API_ENDPOINTS } from "@app/constants/apiEndpoints";
import { COOKIES_AUTH_TOKEN_KEY } from "@app/constants/tokens";
import { storeAuthTokens } from "@app/utils/tokens";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import nookies from "nookies";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

let context: GetServerSidePropsContext | null = null;

export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

export const TOKEN_KEY = "token";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const isServer = typeof window === "undefined";

  let token: string | null = null;

  if (!isServer) {
    const cookies = document.cookie;
    const cookie = cookies
      .split(";")
      .find((cookie) => cookie.trim().startsWith(`${COOKIES_AUTH_TOKEN_KEY}=`));

    if (!cookie) return config;

    token = cookie?.split("=")[1];
  } else {
    const cookies = nookies.get(context);

    token = cookies[COOKIES_AUTH_TOKEN_KEY];
  }

  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }

  return config;
});

createAuthRefreshInterceptor(api, async (failedRequest) => {
  const { data } = await api.get<{ token: string }>(API_ENDPOINTS.auth.refresh, {
    withCredentials: true,
  });

  storeAuthTokens(null, data);
  failedRequest.response.config.headers["Authorization"] = "Bearer " + data.token;

  return Promise.resolve();
});

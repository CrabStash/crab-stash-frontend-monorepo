import type { GetServerSidePropsContext, PreviewData } from "next";

import { TOKEN_KEY } from "@app/api";
import { AUTH_TOKENS_AGE, COOKIES_AUTH_TOKEN_KEY } from "@app/constants/tokens";
import { destroyCookie, setCookie } from "nookies";
import type { ParsedUrlQuery } from "querystring";

export const storeAuthTokens = (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData> | null,
  data: { token: string },
): void => {
  setCookie(context, COOKIES_AUTH_TOKEN_KEY, data.token, {
    maxAge: AUTH_TOKENS_AGE,
    path: "/",
  });

  localStorage.setItem(TOKEN_KEY, data.token);
};

export const destroyAuthTokens = (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData> | null,
): void => {
  const isServer = typeof window === "undefined";

  destroyCookie(context, COOKIES_AUTH_TOKEN_KEY, {
    path: "/",
  });

  if (!isServer) {
    localStorage.removeItem(TOKEN_KEY);
  }
};

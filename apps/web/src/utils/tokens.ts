import type { GetServerSidePropsContext, PreviewData } from "next";

import { AUTH_TOKENS_AGE, COOKIES_AUTH_TOKEN_KEY } from "@app/constants/tokens";
import { setCookie } from "nookies";
import type { ParsedUrlQuery } from "querystring";

export const storeAuthTokens = (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData> | null,
  data: { token: string },
): void => {
  setCookie(context, COOKIES_AUTH_TOKEN_KEY, data.token, {
    maxAge: AUTH_TOKENS_AGE,
    path: "/",
  });
};

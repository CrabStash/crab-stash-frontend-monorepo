import { Query, QueryClient } from "@tanstack/react-query";

import type { GetServerSideProps, GetServerSidePropsContext } from "next";

import { setContext } from "@app/api";
import { COOKIES_AUTH_TOKEN_KEY } from "@app/constants/tokens";
import { URLS } from "@app/constants/urls";
import { meFetcher, meQueryKey } from "@app/hooks/use-me-query";
import { destroyAuthTokens } from "@app/utils/tokens";
import nookies from "nookies";

const redirectToLogin = {
  redirect: {
    destination: URLS.login,
    permanent: false,
  },
} as const;

type GSSPWithQueryClient = GetServerSideProps extends (...a: infer U) => infer R
  ? (queryClient: QueryClient, ...a: U) => R
  : never;

export const withAuth = (getServerSidePropsFunc: GSSPWithQueryClient) => {
  return async (context: GetServerSidePropsContext) => {
    const cookies = nookies.get(context);

    setContext(context);

    if (!cookies[COOKIES_AUTH_TOKEN_KEY]) {
      return redirectToLogin;
    }

    const queryClient = new QueryClient();

    try {
      await queryClient.prefetchQuery([meQueryKey], meFetcher);
    } catch (error) {
      destroyAuthTokens(context);

      return redirectToLogin;
    }

    return await getServerSidePropsFunc(queryClient, context);
  };
};

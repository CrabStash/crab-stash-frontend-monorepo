import type { Query } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

import type { GetServerSideProps, GetServerSidePropsContext } from "next";

import { setContext } from "@app/api";
import { COOKIES_AUTH_TOKEN_KEY } from "@app/constants/tokens";
import { URLS } from "@app/constants/urls";
import type { MeQueryResponse } from "@app/hooks/use-me-query";
import { meFetcher, meQueryKey } from "@app/hooks/use-me-query";
import { destroyAuthTokens } from "@app/utils/tokens";
import nookies from "nookies";

const redirectToLogin = {
  redirect: {
    destination: URLS.login,
    permanent: false,
  },
} as const;

type GSSPWithQueryClient = GetServerSideProps extends (a: infer U) => infer R
  ? (a: U, queryClient: QueryClient) => R
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

      const query = queryClient.getQueryData<MeQueryResponse>([meQueryKey]);

      if (!query?.response.data) {
        throw new Error("No data");
      }
    } catch (error) {
      destroyAuthTokens(context);

      return redirectToLogin;
    }

    return await getServerSidePropsFunc(context, queryClient);
  };
};

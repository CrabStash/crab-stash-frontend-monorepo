import type { GetServerSideProps, GetServerSidePropsContext } from "next";

import { api, setContext } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/apiEndpoints";
import { COOKIES_AUTH_TOKEN_KEY } from "@app/constants/tokens";
import { URLS } from "@app/constants/urls";
import { destroyAuthTokens } from "@app/utils/tokens";
import nookies from "nookies";

const redirectToLogin = {
  redirect: {
    destination: URLS.login,
    permanent: false,
  },
} as const;

export const withAuth = (getServerSidePropsFunc: GetServerSideProps) => {
  return async (context: GetServerSidePropsContext) => {
    const cookies = nookies.get(context);

    setContext(context);

    if (!cookies[COOKIES_AUTH_TOKEN_KEY]) {
      return redirectToLogin;
    }

    try {
      await api.get(API_ENDPOINTS.user.me);
    } catch (error) {
      destroyAuthTokens(context);

      return redirectToLogin;
    }

    return await getServerSidePropsFunc(context);
  };
};

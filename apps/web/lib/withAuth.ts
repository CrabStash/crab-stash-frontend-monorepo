import type { GetServerSideProps, GetServerSidePropsContext } from "next";

import { COOKIES_AUTH_TOKEN_KEY } from "@app/constants/tokens";
import { URLS } from "@app/constants/urls";
import nookies from "nookies";

export const withAuth = (getServerSidePropsFunc: GetServerSideProps) => {
  return async (context: GetServerSidePropsContext) => {
    const cookies = nookies.get(context);

    if (!cookies[COOKIES_AUTH_TOKEN_KEY]) {
      return {
        redirect: {
          destination: URLS.login,
          permanent: false,
        },
      };
    }

    return await getServerSidePropsFunc(context);
  };
};

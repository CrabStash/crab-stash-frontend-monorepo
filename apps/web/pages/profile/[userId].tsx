import { dehydrate } from "@tanstack/react-query";

import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import useUserQuery from "@app/hooks/queries/use-user-query";
import Profile from "@app/screens/profile";
import { createPageTitle } from "@crab-stash/utils";
import { withAuth } from "lib/with-auth";
import { withRequiredPageData } from "lib/with-required-page-data";

const Page: NextPage = () => {
  const { data } = useUserQuery();
  const userData = data?.response.data;

  return (
    <>
      <Head>
        <title>{createPageTitle(`${userData?.firstName} ${userData?.lastName} profile`)}</title>
      </Head>
      <Layout>
        <Profile />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(async (ctx, queryClient) => {
  return await withRequiredPageData({
    callback: async () => {
      return {
        props: {
          dehydratedState: dehydrate(queryClient),
        },
      };
    },
    context: ctx,
    queryClient,
    options: {
      withWarehouses: true,
    },
  });
});

export default Page;

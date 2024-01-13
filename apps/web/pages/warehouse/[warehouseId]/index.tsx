import { dehydrate } from "@tanstack/react-query";

import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import Dashboard from "@app/screens/dashboard";
import { createPageTitle } from "@crab-stash/utils";
import { withAuth } from "lib/with-auth";
import { withRequiredPageData } from "lib/with-required-page-data";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>{createPageTitle("Dashboard")}</title>
      </Head>
      <Layout>
        <Dashboard />
      </Layout>
    </>
  );
};

export const getServerSideProps = withAuth(async (_, queryClient) => {
  return await withRequiredPageData({
    context: _,
    queryClient,
    options: {
      withWarehouses: true,
    },
    callback: async () => {
      return {
        props: {
          dehydratedState: dehydrate(queryClient),
        },
      };
    },
  });
});

export default Page;

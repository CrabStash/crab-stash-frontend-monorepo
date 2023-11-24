import { dehydrate } from "@tanstack/react-query";

import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import WarehouseCreator from "@app/screens/warehouse-creator";
import { createPageTitle } from "@app/utils/createPageTitle";
import { withAuth } from "lib/withAuth";
import { getRequiredPageData } from "lib/withRequiredPageData";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>{createPageTitle("Create a warehouse")}</title>
        <meta name="description" content="Turborepo Starter: Web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <WarehouseCreator redirectToDashboardOnSuccess />
      </Layout>
    </>
  );
};

export const getServerSideProps = withAuth(async (_, queryClient) => {
  await getRequiredPageData(_, queryClient, {
    withWarehouses: true,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});

export default Page;

import { dehydrate } from "@tanstack/react-query";

import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import Dashboard from "@app/screens/dashboard";
import { withAuth } from "lib/withAuth";
import { getRequiredPageData } from "lib/withRequiredPageData";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Warehouse</title>
        <meta name="description" content="Turborepo Starter: Web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Dashboard />
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

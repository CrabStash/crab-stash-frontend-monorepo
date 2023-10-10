import { dehydrate } from "@tanstack/react-query";

import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import Dashboard from "@app/screens/dashboard";
import { withAuth } from "lib/withAuth";

const Web: NextPage = () => {
  return (
    <>
      <Head>
        <title>Turborepo Starter: Web</title>
        <meta name="description" content="Turborepo Starter: Web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Dashboard />
      </Layout>
    </>
  );
};

export const getServerSideProps = withAuth(async (queryClient) => {
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});

export default Web;

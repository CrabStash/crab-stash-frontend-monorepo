import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import LoginScreen from "@app/screens/login";
import { createPageTitle } from "@crab-stash/utils";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>{createPageTitle("Login")}</title>
        <meta name="description" content="Login to Crabstash to start managing your shop stash." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout type="auth">
        <LoginScreen />
      </Layout>
    </>
  );
};

export default Page;

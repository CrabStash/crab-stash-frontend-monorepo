import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import RegisterScreen from "@app/screens/register";
import { createPageTitle } from "@crab-stash/utils";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>{createPageTitle("Register")}</title>
        <meta
          name="description"
          content="Register to Crabstash to start managing your shop stash."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout type="auth">
        <RegisterScreen />
      </Layout>
    </>
  );
};

export default Page;

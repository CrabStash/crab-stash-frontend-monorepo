import type { NextPage } from "next";
import Head from "next/head";

import Layout from "@app/components/layout";
import RegisterScreen from "@app/screens/register";

const RegisterPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Register to Crabstash</title>
        <meta
          name="description"
          content="Register to Crabstash to start managing your shop stash."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <RegisterScreen />
      </Layout>
    </>
  );
};

export default RegisterPage;

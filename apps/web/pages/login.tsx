import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import LoginScreen from "@app/screens/login";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login to Crabstash</title>
        <meta name="description" content="Login to Crabstash to start managing your shop stash." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout type="auth">
        <LoginScreen />
      </Layout>
    </>
  );
};

export default Login;

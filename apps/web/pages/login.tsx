import type { NextPage } from "next";
import Head from "next/head";

import Layout from "@app/components/layout";
import LoginScreen from "@app/screens/login";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Turborepo Starter: Web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <LoginScreen />
      </Layout>
    </>
  );
};

export default Login;

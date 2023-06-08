import "@crab-stash/ui/styles/tailwind.css";

import type { NextPage } from "next";
import Head from "next/head";

import { Button } from "@crab-stash/ui";

const Docs: NextPage = () => {
  return (
    <>
      <Head>
        <title>Turborepo Starter: Docs</title>
        <meta name="description" content="Turborepo Starter: Docs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Turborepo Starter: Docs</h1>
        <Button>Button</Button>
      </main>
    </>
  );
};

export default Docs;

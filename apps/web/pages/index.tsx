import type { NextPage } from "next";
import Head from "next/head";

import { Button, Card } from "@crab-stash/ui";

const Web: NextPage = () => {
  return (
    <>
      <Head>
        <title>Turborepo Starter: Web</title>
        <meta name="description" content="Turborepo Starter: Web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Turborepo Starter: Web</h1>
        <Button>Button</Button>
        <Card title="Card Title" description="Card Description" footerContent="Card Footer">
          Card Content
        </Card>
      </main>
    </>
  );
};

export default Web;

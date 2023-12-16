import { dehydrate } from "@tanstack/react-query";

import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import ProductsLayout from "@app/components/products-layout";
import ProductCreator from "@app/screens/product-creator";
import { createPageTitle } from "@app/utils/createPageTitle";
import { withAuth } from "lib/withAuth";
import { getRequiredPageData } from "lib/withRequiredPageData";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>{createPageTitle("Add Product")}</title>
      </Head>
      <Layout>
        <ProductsLayout>
          <ProductCreator />
        </ProductsLayout>
      </Layout>
    </>
  );
};

export const getServerSideProps = withAuth(async (ctx, queryClient) => {
  await getRequiredPageData(ctx, queryClient, {
    withWarehouses: true,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});

export default Page;

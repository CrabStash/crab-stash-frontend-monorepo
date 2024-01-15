import { dehydrate } from "@tanstack/react-query";

import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import ProductsLayout from "@app/components/products-layout";
import Products from "@app/screens/products";
import { createPageTitle } from "@crab-stash/utils";
import { withAuth } from "lib/with-auth";
import { withRequiredPageData } from "lib/with-required-page-data";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>{createPageTitle("Products")}</title>
      </Head>
      <Layout>
        <ProductsLayout>
          <Products />
        </ProductsLayout>
      </Layout>
    </>
  );
};

export const getServerSideProps = withAuth(async (ctx, queryClient) => {
  return await withRequiredPageData({
    context: ctx,
    queryClient,
    callback: async () => {
      return {
        props: {
          dehydratedState: dehydrate(queryClient),
        },
      };
    },
    options: {
      withWarehouses: true,
    },
  });
});

export default Page;

import { dehydrate } from "@tanstack/react-query";

import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import CategoriesLayout from "@app/components/categories-layout";
import CategoryCreator from "@app/screens/category-creator";
import { createPageTitle } from "@crab-stash/utils";
import { withAuth } from "lib/with-auth";
import { withRequiredPageData } from "lib/with-required-page-data";
import { WarehouseRole } from "types/warehouse-role";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>{createPageTitle("Create category")}</title>
      </Head>
      <Layout>
        <CategoriesLayout>
          <CategoryCreator />
        </CategoriesLayout>
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
      withCurrentWarehouse: true,
      requiredRole: WarehouseRole.MODERATOR,
    },
  });
});

export default Page;

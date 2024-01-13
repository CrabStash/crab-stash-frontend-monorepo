import { dehydrate } from "@tanstack/react-query";

import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import WarehouseSettingLayout from "@app/components/warehouse-settings-layout";
import UsersSettings from "@app/screens/users-settings";
import { createPageTitle } from "@crab-stash/utils";
import { withAuth } from "lib/with-auth";
import { withRequiredPageData } from "lib/with-required-page-data";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>{createPageTitle("Users settings")}</title>
      </Head>
      <Layout>
        <WarehouseSettingLayout>
          <UsersSettings />
        </WarehouseSettingLayout>
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
      withWarehouseUsers: true,
    },
  });
});

export default Page;

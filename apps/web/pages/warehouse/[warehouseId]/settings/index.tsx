import { dehydrate } from "@tanstack/react-query";

import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import WarehouseSettingLayout from "@app/components/warehouse-settings-layout";
import GeneralSettings from "@app/screens/general-settings";
import { createPageTitle } from "@crab-stash/utils";
import { withAuth } from "lib/withAuth";
import { getRequiredPageData } from "lib/withRequiredPageData";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>{createPageTitle("General settings")}</title>
      </Head>
      <Layout>
        <WarehouseSettingLayout>
          <GeneralSettings />
        </WarehouseSettingLayout>
      </Layout>
    </>
  );
};

export const getServerSideProps = withAuth(async (context, queryClient) => {
  await getRequiredPageData(context, queryClient, {
    withWarehouses: true,
    withCurrentWarehouse: true,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});

export default Page;

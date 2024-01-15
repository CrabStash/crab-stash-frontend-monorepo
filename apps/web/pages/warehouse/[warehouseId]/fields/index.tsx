import { dehydrate } from "@tanstack/react-query";

import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import FieldsLayout from "@app/components/fields-layout";
import Fields from "@app/screens/fields";
import { createPageTitle } from "@crab-stash/utils";
import { withAuth } from "lib/with-auth";
import { withRequiredPageData } from "lib/with-required-page-data";
import { WarehouseRole } from "types/warehouse-role";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>{createPageTitle("Fields")}</title>
      </Head>
      <Layout>
        <FieldsLayout>
          <Fields />
        </FieldsLayout>
      </Layout>
    </>
  );
};

export const getServerSideProps = withAuth(async (context, queryClient) => {
  return await withRequiredPageData({
    context,
    queryClient,
    options: {
      withWarehouses: true,
      withWarehouseFields: true,
      withCurrentWarehouse: true,
      requiredRole: WarehouseRole.MODERATOR,
    },
    callback: async () => {
      return {
        props: {
          dehydratedState: dehydrate(queryClient),
        },
      };
    },
  });
});

export default Page;

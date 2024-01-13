import { dehydrate } from "@tanstack/react-query";

import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import FieldsLayout from "@app/components/fields-layout";
import FieldCreator from "@app/screens/field-creator";
import { createPageTitle } from "@crab-stash/utils";
import { withAuth } from "lib/with-auth";
import { withRequiredPageData } from "lib/with-required-page-data";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>{createPageTitle("Create field")}</title>
      </Head>
      <Layout>
        <FieldsLayout>
          <FieldCreator />
        </FieldsLayout>
      </Layout>
    </>
  );
};

export const getServerSideProps = withAuth(async (ctx, queryClient) => {
  return await withRequiredPageData({
    queryClient,
    context: ctx,
    options: {
      withWarehouses: true,
      withCurrentWarehouse: true,
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

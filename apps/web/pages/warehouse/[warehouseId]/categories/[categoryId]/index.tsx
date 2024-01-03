import { dehydrate } from "@tanstack/react-query";

import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import CategoriesLayout from "@app/components/categories-layout";
import useCategoryByIdQuery from "@app/hooks/queries/use-category-by-id-query";
import Category from "@app/screens/category";
import { createPageTitle } from "@crab-stash/utils";
import { withAuth } from "lib/withAuth";
import { getRequiredPageData } from "lib/withRequiredPageData";

const Page: NextPage = () => {
  const { data } = useCategoryByIdQuery();

  return (
    <>
      <Head>
        <title>{createPageTitle(`${data?.response.data.formData.title} category`)}</title>
      </Head>
      <Layout>
        <CategoriesLayout>
          <Category />
        </CategoriesLayout>
      </Layout>
    </>
  );
};

export const getServerSideProps = withAuth(async (ctx, queryClient) => {
  await getRequiredPageData(ctx, queryClient, {
    withWarehouses: true,
    withCurrentWarehouse: true,
    withCurrentCategory: true,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});

export default Page;

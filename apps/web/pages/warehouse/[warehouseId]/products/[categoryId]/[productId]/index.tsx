import { dehydrate } from "@tanstack/react-query";

import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { Layout } from "@app/components";
import ProductsLayout from "@app/components/products-layout";
import useProductByIdQuery from "@app/hooks/queries/use-product-by-id-query";
import FormStep from "@app/screens/product-creator/form-step";
import { getCategoryId, getProductId } from "@app/utils/param-ids";
import { createPageTitle } from "@crab-stash/utils";
import { withAuth } from "lib/with-auth";
import { withRequiredPageData } from "lib/with-required-page-data";

const Page: NextPage = () => {
  const { query } = useRouter();
  const categoryId = getCategoryId(query);
  const productId = getProductId(query);
  const { data } = useProductByIdQuery({
    productId,
    categoryId,
  });

  if (!data?.response.data.formData) return null;

  return (
    <>
      <Head>
        <title>{createPageTitle(`${data?.response.data.formData.name} product`)}</title>
      </Head>
      <Layout>
        <ProductsLayout>
          <FormStep
            categoryId={categoryId as string}
            formData={data?.response.data.formData}
            readonly
          />
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
      withCurrentWarehouse: true,
      withCurrentProduct: true,
    },
  });
});

export default Page;

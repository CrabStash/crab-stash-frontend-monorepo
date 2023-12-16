import { dehydrate } from "@tanstack/react-query";

import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import { URLS } from "@app/constants/urls";
import type { MeQueryResponse } from "@app/hooks/queries/use-me-query";
import { meFetcher, meQueryKey } from "@app/hooks/queries/use-me-query";
import useWarehousesQuery from "@app/hooks/queries/use-warehouses-query";
import Dashboard from "@app/screens/dashboard";
import WarehouseCreator from "@app/screens/warehouse-creator";
import { formatIdToQuery } from "@app/utils/queryIds";
import { createPageTitle } from "@crab-stash/utils";
import { withAuth } from "lib/withAuth";
import { getRequiredPageData } from "lib/withRequiredPageData";

const Page: NextPage = () => {
  const { data } = useWarehousesQuery();

  return (
    <>
      <Head>
        <title>{createPageTitle("Dashboard")}</title>
        <meta name="description" content="Turborepo Starter: Web" />
      </Head>
      <Layout>
        {data?.response.data.list && data.response.data.list.length > 0 ? (
          <Dashboard />
        ) : (
          <WarehouseCreator />
        )}
      </Layout>
    </>
  );
};

export const getServerSideProps = withAuth(async (context, queryClient) => {
  await getRequiredPageData(context, queryClient, {
    withWarehouses: true,
  });

  await queryClient.prefetchQuery([meQueryKey], () => meFetcher(context));

  const me = queryClient.getQueryData<MeQueryResponse>([meQueryKey]);
  const defaultWarehouseId = me?.response.data.default_warehouse;

  if (defaultWarehouseId) {
    return {
      redirect: {
        destination: URLS.warehouseDashboard(formatIdToQuery(defaultWarehouseId)),
        permanent: false,
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});

export default Page;

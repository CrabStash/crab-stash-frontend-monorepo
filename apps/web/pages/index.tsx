import { dehydrate } from "@tanstack/react-query";

import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import { URLS } from "@app/constants/urls";
import type { WarehousesQueryResponse } from "@app/hooks/queries/use-warehouses-query";
import useWarehousesQuery, { warehousesQueryKey } from "@app/hooks/queries/use-warehouses-query";
import Dashboard from "@app/screens/dashboard";
import WarehouseCreator from "@app/screens/warehouse-creator";
import { formatIdToQuery } from "@app/utils/queryIds";
import { withAuth } from "lib/withAuth";
import { getRequiredPageData } from "lib/withRequiredPageData";

const Page: NextPage = () => {
  const { data } = useWarehousesQuery();

  return (
    <>
      <Head>
        <title>Turborepo Starter: Web</title>
        <meta name="description" content="Turborepo Starter: Web" />
        <link rel="icon" href="/favicon.ico" />
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

export const getServerSideProps = withAuth(async (_, queryClient) => {
  await getRequiredPageData(_, queryClient, {
    withWarehouses: true,
  });

  const warehousesData = queryClient.getQueryData<WarehousesQueryResponse>([warehousesQueryKey]);

  const warehousesList = warehousesData?.response.data.list;

  if (warehousesList && warehousesList[0]) {
    return {
      redirect: {
        destination: URLS.warehouseDashboard(formatIdToQuery(warehousesList[0].warehouse.id)),
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

import { dehydrate } from "@tanstack/react-query";

import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import useUserQuery, { userFetcher, userQueryKey } from "@app/hooks/queries/use-user-query";
import Profile from "@app/screens/profile";
import { createPageTitle } from "@app/utils/createPageTitle";
import { withAuth } from "lib/withAuth";
import { getRequiredPageData } from "lib/withRequiredPageData";

const Page: NextPage = () => {
  const { data } = useUserQuery();
  const userData = data?.response.data;

  return (
    <>
      <Head>
        <title>{createPageTitle(`${userData?.firstName} ${userData?.lastName} profile`)}</title>
      </Head>
      <Layout>
        <Profile />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(async (ctx, queryClient) => {
  await getRequiredPageData(ctx, queryClient, {
    withWarehouses: true,
  });

  const userId = ctx.query.userId as string;

  await queryClient.prefetchQuery([userQueryKey, userId], () => userFetcher(userId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});

export default Page;

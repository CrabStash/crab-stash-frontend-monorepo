import { dehydrate } from "@tanstack/react-query";

import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import ProfileSettingsLayout from "@app/components/profile-settings-layout";
import ProfileInfoSettings from "@app/screens/profile-info-settings";
import { createPageTitle } from "@crab-stash/utils";
import { withAuth } from "lib/withAuth";
import { getRequiredPageData } from "lib/withRequiredPageData";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>{createPageTitle("Profile settings")}</title>
      </Head>
      <Layout>
        <ProfileSettingsLayout>
          <ProfileInfoSettings />
        </ProfileSettingsLayout>
      </Layout>
    </>
  );
};

export const getServerSideProps = withAuth(async (_, queryClient) => {
  await getRequiredPageData(_, queryClient, {
    withWarehouses: true,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});

export default Page;

import { dehydrate } from "@tanstack/react-query";

import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "@app/components";
import ProfileSettingsLayout from "@app/components/profile-settings-layout";
import ProfileSecuritySettings from "@app/screens/profile-security-settings";
import { createPageTitle } from "@crab-stash/utils";
import { withAuth } from "lib/with-auth";
import { withRequiredPageData } from "lib/with-required-page-data";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>{createPageTitle("Profile security")}</title>
      </Head>
      <Layout>
        <ProfileSettingsLayout>
          <ProfileSecuritySettings />
        </ProfileSettingsLayout>
      </Layout>
    </>
  );
};

export const getServerSideProps = withAuth(async (context, queryClient) => {
  return await withRequiredPageData({
    context,
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
    },
  });
});

export default Page;

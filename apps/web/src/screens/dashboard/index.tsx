import Image from "next/image";
import { useTheme } from "next-themes";

import Overview from "./components/overview";

import PageTitle from "@app/components/page-title";
import type { Tab } from "@crab-stash/ui";
import { Typography } from "@crab-stash/ui";
import { Tabs } from "@crab-stash/ui";

type DashboardTabValue = "overview" | "analytics" | "notifications";

const ComingSoon = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={theme === "dark" ? "/coming-soon-dark.svg" : "/coming-soon.svg"}
        width="320"
        alt="coming soon"
        height="320"
      />
      <Typography as="h3" variant="h3" className="mt-4">
        This feature is coming soon! Stay tuned! 🚀
      </Typography>
    </div>
  );
};

function Dashboard() {
  const dashboardTabs: Tab<DashboardTabValue>[] = [
    {
      label: "Overview",
      value: "overview",
      content: <Overview />,
    },
    {
      label: "Notifications",
      value: "notifications",
      content: <ComingSoon />,
    },
    {
      label: "Analytics",
      value: "analytics",
      content: <ComingSoon />,
    },
  ];

  return (
    <div className="flex-1">
      <PageTitle>Dashboard</PageTitle>
      <Tabs tabs={dashboardTabs} defaultValue="overview" />
    </div>
  );
}

export default Dashboard;

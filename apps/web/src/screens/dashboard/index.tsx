import Overview from "./components/overview";

import PageTitle from "@app/components/page-title";
import type { Tab } from "@crab-stash/ui";
import { Tabs } from "@crab-stash/ui";

type DashboardTabValue = "overview" | "analytics";

function Dashboard() {
  const dashboardTabs: Tab<DashboardTabValue>[] = [
    {
      label: "Overview",
      value: "overview",
      content: <Overview />,
    },
    {
      label: "Analytics",
      value: "analytics",
      content: <>Analytics</>,
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

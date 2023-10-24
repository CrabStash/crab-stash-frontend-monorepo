import Overview from "./components/overview";

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
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs tabs={dashboardTabs} defaultValue="overview" />
    </div>
  );
}

export default Dashboard;

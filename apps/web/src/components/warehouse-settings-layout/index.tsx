import type { ReactNode } from "react";
import { useMemo } from "react";

import SidebarNav from "../sidebar-nav";

import useWarehouseId from "@app/hooks/use-warehouse-id";
import { Separator } from "@crab-stash/ui";

interface WarehouseSettingLayoutProps {
  children: ReactNode;
}

function WarehouseSettingLayout({ children }: WarehouseSettingLayoutProps) {
  const warehouseId = useWarehouseId();

  const sidebarNavItems = useMemo(
    () => [
      {
        title: "General",
        href: `/warehouse/${warehouseId}/settings`,
      },
      {
        title: "Users",
        href: `/warehouse/${warehouseId}/settings/users`,
      },
    ],
    [warehouseId],
  );

  if (!warehouseId) return null;

  return (
    <div className="space-y-6 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your warehouse settings.</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

export default WarehouseSettingLayout;

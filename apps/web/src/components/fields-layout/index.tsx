import type { ReactNode } from "react";

import { useRouter } from "next/router";

import { getWarehouseId } from "../navigation/main-navigation";
import SidebarNav from "../sidebar-nav";

import { URLS } from "@app/constants/urls";
import useWarehouseInfoQuery from "@app/hooks/queries/use-warehouse-info-query";
import { Separator } from "@crab-stash/ui";

interface FieldsLayoutProps {
  children: ReactNode;
}

function FieldsLayout({ children }: FieldsLayoutProps) {
  const { query } = useRouter();
  const warehouseId = getWarehouseId(query);
  const { data } = useWarehouseInfoQuery({
    id: warehouseId,
  });

  if (!warehouseId) return null;

  const sidebarNavItems = [
    {
      title: "Fields list",
      href: URLS.fields(warehouseId),
    },
    {
      title: "Create field",
      href: URLS.createField(warehouseId),
    },
  ];

  return (
    <div className="space-y-6 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Fields for <span className="text-primary">{data?.response.data.name}</span>
        </h2>
        <p className="text-muted-foreground">
          Fields are used to describe your products. You can create as many fields as you need.
        </p>
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

export default FieldsLayout;

import type { LucideIcon } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { DollarSign, ShoppingCart, Users } from "lucide-react";

import { graphData } from "./data";
import useDashboardQuery from "./use-dashboard-query";

import { formatNumber } from "@app/utils/formatNumber";
import { formatPrice } from "@app/utils/formatPrice";
import { Avatar, BarGraph, Card } from "@crab-stash/ui";

type OverviewQuickStats = {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
};

function Overview() {
  const query = useDashboardQuery();
  const data = query.data?.response?.data;

  const quickStats: OverviewQuickStats[] = [
    {
      label: "Total warehouse value",
      value: formatPrice(data?.warehouseValue),
      description: "Represents the total value of all products in the warehouse.",
      icon: DollarSign,
    },
    {
      label: "Total products",
      value: `${formatNumber(data?.entitiesCount.all)}`,
      description: "Number of all products in the warehouse.",
      icon: ShoppingCart,
    },
    {
      label: "Unique products",
      value: `${formatNumber(data?.entitiesCount.unique)}`,
      description: "Number of unique products in the warehouse.",
      icon: ShoppingBag,
    },
    {
      label: "Employee count",
      value: `${formatNumber(data?.employees)}`,
      description: "Count of all employees in the warehouse.",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-8 mt-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((quickStat) => {
          const Icon = quickStat.icon;

          return (
            <Card
              title={quickStat.label}
              key={quickStat.label}
              titleClassName="text-sm font-medium"
              icon={<Icon className="h-4 w-4 text-muted-foreground" />}
            >
              <>
                <div className="text-2xl font-bold">{quickStat.value}</div>
                <p className="text-xs text-muted-foreground">{quickStat.description}</p>
              </>
            </Card>
          );
        })}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 max-w-full overflow-x-auto">
        <Card title="Overview" className="col-span-4">
          <BarGraph data={graphData} tickFormatter={(value) => formatPrice(value)} />
        </Card>
        <Card
          title="Recently added products"
          description={
            data?.newestEntities.length
              ? `Warehouse stock has been expanded with ${data?.newestEntities.length}new products.`
              : "No new products have been added to the warehouse."
          }
          className="col-span-3"
        >
          <div className="space-y-8">
            {data?.newestEntities?.map((product) => (
              <div className="flex items-center" key={product.name}>
                <Avatar fullName={product.name} className="h-9 w-9" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>
                <div className="ml-auto font-medium">{formatPrice(666.66)}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Overview;

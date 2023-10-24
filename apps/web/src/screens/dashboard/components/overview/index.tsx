import type { LucideIcon } from "lucide-react";
import { CreditCard, DollarSign, ShoppingCart, Users } from "lucide-react";

import { data, products } from "./data";

import { formatNumber } from "@app/utils/formatNumber";
import { formatPrice } from "@app/utils/formatPrice";
import { Avatar, BarGraph, Card } from "@crab-stash/ui";

type OverviewQuickStats = {
  label: string;
  value: string;
  difference: string;
  icon: LucideIcon;
};

const quickStats: OverviewQuickStats[] = [
  {
    label: "Total Revenue",
    value: formatPrice(45231.89),
    difference: "+12.4% from last month",
    icon: DollarSign,
  },
  {
    label: "Total products",
    value: `+${formatNumber(2350)}`,
    difference: "+2.4% from last month",
    icon: ShoppingCart,
  },
  {
    label: "Sales",
    value: `+${formatNumber(12234)}`,
    difference: "+12.4% from last month",
    icon: CreditCard,
  },
  {
    label: "Total customers",
    value: `+${formatNumber(573)}`,
    difference: "+12.4% from last month",
    icon: Users,
  },
];

function Overview() {
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
                <p className="text-xs text-muted-foreground">{quickStat.difference}</p>
              </>
            </Card>
          );
        })}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card title="Overview" className="col-span-4">
          <BarGraph data={data} />
        </Card>
        <Card
          title="Recently added products"
          description="Warehouse stock has been expanded with 34 new products."
          className="col-span-3"
        >
          <div className="space-y-8">
            {products.map((product) => (
              <div className="flex items-center">
                <Avatar src={product.image} fullName={product.name} className="h-9 w-9" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
                <div className="ml-auto font-medium">{formatPrice(product.price)}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Overview;

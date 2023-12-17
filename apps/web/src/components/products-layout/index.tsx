import type { ReactNode } from "react";

import { useRouter } from "next/router";

import SidebarNav from "../sidebar-nav";

import { URLS } from "@app/constants/urls";
import useWarehouseInfoQuery from "@app/hooks/queries/use-warehouse-info-query";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import { getCategoryId, getProductId } from "@app/utils/param-ids";
import { Separator } from "@crab-stash/ui";

interface ProductsLayoutProps {
  children: ReactNode;
}

function ProductsLayout({ children }: ProductsLayoutProps) {
  const warehouseId = useWarehouseId();
  const { query, asPath } = useRouter();
  const categoryId = getCategoryId(query);
  const productId = getProductId(query);
  const { data } = useWarehouseInfoQuery({
    id: warehouseId,
  });

  if (!warehouseId) return null;

  const sidebarNavItems = [
    {
      title: "Products",
      href: URLS.products(warehouseId),
    },
    {
      title: "Add product",
      href: URLS.addProduct(warehouseId),
    },
    ...(categoryId &&
    productId &&
    decodeURIComponent(asPath) === URLS.editProduct(warehouseId, categoryId, productId)
      ? [
          {
            title: "Edit product",
            href: URLS.editProduct(warehouseId, categoryId, productId),
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-6 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Products in <span className="text-primary">{data?.response.data.name}</span> warehouse
        </h2>
        <p className="text-muted-foreground">Manage your products in this warehouse</p>
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

export default ProductsLayout;

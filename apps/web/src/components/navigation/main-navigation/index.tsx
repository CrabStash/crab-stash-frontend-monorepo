import type { HTMLAttributes } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { URLS } from "@app/constants/urls";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import { cn } from "@crab-stash/ui/lib/utils";

type Link = {
  href: string;
  label: string;
};

const isLinkActive = (currentPath: string, path: string) => {
  return currentPath === path;
};

function MainNavigation({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const router = useRouter();

  const warehouseId = useWarehouseId();

  const mainNavigationLinks: Link[] = [
    {
      href: warehouseId ? URLS.warehouseDashboard(warehouseId) : URLS.dashboard,
      label: "Dashboard",
    },
    {
      href: URLS.fields(warehouseId as string),
      label: "Fields",
    },
    {
      href: URLS.categories(warehouseId as string),
      label: "Categories",
    },
    {
      href: URLS.products(warehouseId as string),
      label: "Products",
    },
    ...(warehouseId
      ? [
          {
            href: URLS.warehouseSettings(warehouseId),
            label: "Settings",
          },
        ]
      : []),
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {mainNavigationLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn("text-sm font-medium transition-colors hover:text-primary", {
            "text-primary": isLinkActive(router.pathname, link.href),
            "text-muted-foreground": !isLinkActive(router.pathname, link.href),
          })}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export default MainNavigation;

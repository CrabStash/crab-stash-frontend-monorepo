import type { HTMLAttributes } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { URLS } from "@app/constants/urls";
import { cn } from "@crab-stash/ui/lib/utils";
import type { ParsedUrlQuery } from "querystring";

type Link = {
  href: string;
  label: string;
};

const isLinkActive = (currentPath: string, path: string) => {
  return currentPath === path;
};

const getWarehouseId = (query: ParsedUrlQuery) => {
  const warehouseId = query["warehouse-id"];

  if (warehouseId && typeof warehouseId === "string") {
    return warehouseId;
  }

  return null;
};

function MainNavigation({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const router = useRouter();

  const warehouseId = getWarehouseId(router.query);

  const mainNavigationLinks: Link[] = [
    {
      href: warehouseId ? URLS.warehouseDashboard(warehouseId) : URLS.dashboard,
      label: "Dashboard",
    },
    {
      href: "/test",
      label: "Categories",
    },

    {
      href: "/test1",
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

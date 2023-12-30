import type { HTMLAttributes } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { URLS } from "@app/constants/urls";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import { cn } from "@crab-stash/ui/lib/utils";

type MainNavigationLink = {
  href: string;
  label: string;
  matchAllPaths?: boolean;
};

const isLinkActive = (currentPath: string, path: string, matchAllPaths = false) => {
  if (matchAllPaths) {
    return decodeURIComponent(currentPath).startsWith(path);
  }

  return decodeURIComponent(currentPath) === path;
};

function MainNavigation({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const router = useRouter();

  const warehouseId = useWarehouseId();

  const mainNavigationLinks: MainNavigationLink[] = [
    {
      href: warehouseId ? URLS.warehouseDashboard(warehouseId) : URLS.dashboard,
      label: "Dashboard",
    },
    {
      href: URLS.fields(warehouseId as string),
      label: "Fields",
      matchAllPaths: true,
    },
    {
      href: URLS.categories(warehouseId as string),
      matchAllPaths: true,
      label: "Categories",
    },
    {
      href: URLS.products(warehouseId as string),
      matchAllPaths: true,
      label: "Products",
    },
    ...(warehouseId
      ? [
          {
            href: URLS.warehouseSettings(warehouseId),
            label: "Settings",
            matchAllPaths: true,
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
            "text-primary": isLinkActive(router.asPath, link.href, link.matchAllPaths),
            "text-muted-foreground": !isLinkActive(router.asPath, link.href, link.matchAllPaths),
          })}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export default MainNavigation;

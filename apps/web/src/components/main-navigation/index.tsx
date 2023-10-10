import type { HTMLAttributes } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { URLS } from "@app/constants/urls";
import { cn } from "@crab-stash/ui/lib/utils";

type Link = {
  href: string;
  label: string;
};

const mainNavigationLinks: Link[] = [
  {
    href: URLS.dashboard,
    label: "Overview",
  },
  {
    href: "/test",
    label: "Customers",
  },

  {
    href: "/test",
    label: "Products",
  },
  {
    href: "/test",
    label: "Settings",
  },
];

const isLinkActive = (currentPath: string, path: string) => {
  return currentPath === path;
};

function MainNavigation({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const router = useRouter();

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

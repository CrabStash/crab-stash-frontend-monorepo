import Link from "next/link";
import { useRouter } from "next/router";

import { cn } from "@crab-stash/ui";
import { buttonVariants } from "@crab-stash/ui/components/button/button";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}
function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const router = useRouter();

  return (
    <nav
      className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            decodeURIComponent(router.asPath) === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export default SidebarNav;

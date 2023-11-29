import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@crab-stash/ui";

interface PageTitleProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function PageTitle({ children, className, ...props }: PageTitleProps) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)} {...props}>
      <h1 className="w-full text-3xl font-bold tracking-tight">{children}</h1>
    </div>
  );
}

export default PageTitle;

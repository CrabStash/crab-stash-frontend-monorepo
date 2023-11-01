import type { ReactNode } from "react";

import Navigation from "../navigation";

import { cn } from "@crab-stash/ui";

type LayoutType = "default" | "auth";

interface LayoutProps {
  children: ReactNode;
  type?: LayoutType;
}

function Layout({ children, type = "default" }: LayoutProps) {
  return (
    <>
      <Navigation />
      <main className="flex items-stretch flex-[1_0_auto]">
        <div
          className={cn(
            "flex-1 w-full  max-w-screen-2xl ",
            type === "default" && "mx-auto space-y-4 p-8 pt-6",
          )}
        >
          {children}
        </div>
      </main>
    </>
  );
}

export default Layout;

import type { ReactNode } from "react";

import Navigation from "../navigation";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navigation />
      <main className="flex items-stretch flex-[1_0_auto]">
        <div className="flex-1 w-full mx-auto max-w-screen-2xl space-y-4 p-8 pt-6">{children}</div>
      </main>
    </>
  );
}

export default Layout;

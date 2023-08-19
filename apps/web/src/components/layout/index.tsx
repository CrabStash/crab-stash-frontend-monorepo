import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <main className="flex items-stretch flex-[1_0_auto]">
      <div className="flex-1 w-full mx-auto max-w-screen-2xl">{children}</div>
    </main>
  );
}

export default Layout;

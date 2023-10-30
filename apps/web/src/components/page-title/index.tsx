import type { ReactNode } from "react";

interface PageTitleProps {
  children: ReactNode;
}

function PageTitle({ children }: PageTitleProps) {
  return (
    <div className="flex items-center justify-between space-y-2 mb-4">
      <h1 className="text-3xl font-bold tracking-tight">{children}</h1>
    </div>
  );
}

export default PageTitle;

import type { ReactNode } from "react";

import { Separator } from "@crab-stash/ui";

interface SettingsTabProps {
  title: string;
  description: string;
  children: ReactNode;
}

function SettingsTab({ title, description, children }: SettingsTabProps) {
  return (
    <div className="space-y-6">
      <div className="max-w-2xl">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Separator />
      {children}
    </div>
  );
}

export default SettingsTab;

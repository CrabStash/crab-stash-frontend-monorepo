import type { ReactNode } from "react";

import SidebarNav from "../sidebar-nav";

import { URLS } from "@app/constants/urls";
import { Separator } from "@crab-stash/ui";

const sidebarNavItems = [
  {
    title: "Profile info",
    href: URLS.profileSettings,
  },
  {
    title: "Security",
    href: URLS.securitySettings,
  },
];

interface ProfileSettingsLayoutProps {
  children: ReactNode;
}

function ProfileSettingsLayout({ children }: ProfileSettingsLayoutProps) {
  return (
    <div className="space-y-6 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Profile settings</h2>
        <p className="text-muted-foreground">Manage your profile settings and security.</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

export default ProfileSettingsLayout;

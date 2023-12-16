import Image from "next/image";
import Link from "next/link";

import ThemeToggle from "../theme-toggle";
import WarehouseSwitcher from "../warehouse-switcher";
import MainNavigation from "./main-navigation";
import UserNavigation from "./user-navigation";

import { URLS } from "@app/constants/urls";
import useMeQuery from "@app/hooks/queries/use-me-query";
import useWarehouseId from "@app/hooks/use-warehouse-id";

function Navigation() {
  const { data, isError } = useMeQuery();
  const warehouseId = useWarehouseId();

  const user = data?.response.data;

  if (!user || isError) {
    return null;
  }

  return (
    <div className="border-b">
      <div className="flex-col md:flex flex-1 w-full mx-auto max-w-screen-2xl">
        <div className="flex h-16 items-center px-6">
          <Link passHref href={warehouseId ? URLS.warehouseDashboard(warehouseId) : URLS.dashboard}>
            <div className="flex items-center gap-1 cursor-pointer font-bold mr-4">
              <Image src="/logo.png" alt="logo" width={50} height={50} />
              <span className="lg:block hidden">Crab Stash</span>
            </div>
          </Link>
          <WarehouseSwitcher />
          <MainNavigation className="hidden md:block ml-4" />
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <UserNavigation user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;

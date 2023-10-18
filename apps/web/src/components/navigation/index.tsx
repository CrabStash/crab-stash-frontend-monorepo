import WarehouseSwitcher from "../warehouse-switcher";
import MainNavigation from "./main-navigation";
import UserNavigation from "./user-navigation";

import useMeQuery from "@app/hooks/use-me-query";

function Navigation() {
  const { data, isError } = useMeQuery();

  const user = data?.response.data;

  if (!user || isError) {
    return null;
  }

  return (
    <div className="border-b">
      <div className="flex-col md:flex flex-1 w-full mx-auto max-w-screen-2xl">
        <div className="flex h-16 items-center px-6">
          <WarehouseSwitcher />
          <MainNavigation className="hidden md:block ml-4" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNavigation user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;

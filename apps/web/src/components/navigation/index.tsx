import MainNavigation from "../main-navigation";
import UserNavigation from "../user-navigation";

function Navigation() {
  return (
    <div className="border-b">
      <div className="flex-col md:flex flex-1 w-full mx-auto max-w-screen-2xl">
        <div className="flex h-16 items-center px-6">
          <MainNavigation />
          <div className="ml-auto flex items-center space-x-4">
            <UserNavigation />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;

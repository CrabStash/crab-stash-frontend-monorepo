import AddUser from "./components/add-user";
import UsersTable from "./components/users-table";

import { Separator } from "@crab-stash/ui";

function UsersSettings() {
  return (
    <div className="space-y-6">
      <div className="max-w-2xl">
        <h3 className="text-lg font-medium">Users</h3>
        <p className="text-sm text-muted-foreground">
          Manage people that have access to your warehouse. You can add, remove, and edit users. As
          an admin, you can also manage user permissions.
        </p>
      </div>
      <Separator className="max-w-2xl" />
      <div className="space-y-6 max-w-4xl">
        <AddUser />
        <UsersTable />
      </div>
    </div>
  );
}

export default UsersSettings;

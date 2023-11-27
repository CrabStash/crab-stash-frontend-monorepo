import AddUser from "./components/add-user";
import UsersTable from "./components/users-table";

import SettingsTab from "@app/components/settings-tab";

function UsersSettings() {
  return (
    <SettingsTab
      title="Users"
      description="Manage people that have access to your warehouse. You can add, remove, and edit users. As an admin, you can also manage user permissions."
    >
      <div className="space-y-6 max-w-4xl">
        <AddUser />
        <UsersTable />
      </div>
    </SettingsTab>
  );
}

export default UsersSettings;

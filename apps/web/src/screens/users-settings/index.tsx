import { useRouter } from "next/router";

import { getWarehouseId } from "@app/components/navigation/main-navigation";
import useWarehouseUsersQuery from "@app/hooks/queries/use-warehouse-users-query";
import { Separator } from "@crab-stash/ui";

function UsersSettings() {
  const { query } = useRouter();
  const warehouseId = getWarehouseId(query);
  const { data } = useWarehouseUsersQuery({
    id: warehouseId,
  });

  console.log(data);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Users</h3>
        <p className="text-sm text-muted-foreground">
          Manage people that have access to your warehouse. You can add, remove, and edit users. As
          an admin, you can also manage user permissions.
        </p>
      </div>
      <Separator />
    </div>
  );
}

export default UsersSettings;

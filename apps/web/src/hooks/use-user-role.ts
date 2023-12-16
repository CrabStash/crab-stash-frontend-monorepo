import useWarehouseInfoQuery from "./queries/use-warehouse-info-query";
import useWarehouseId from "./use-warehouse-id";

import { WarehouseRole } from "types/warehouse-role";

function checkUserRole(userRole?: WarehouseRole, role?: WarehouseRole) {
  if (userRole === undefined || role === undefined) return false;

  return userRole >= role;
}

function useUserRole() {
  const warehouseId = useWarehouseId();
  const { data } = useWarehouseInfoQuery({
    id: warehouseId,
  });
  const role = data?.response.data.role;

  const isOwner = checkUserRole(role, WarehouseRole.OWNER);
  const isAdmin = checkUserRole(role, WarehouseRole.ADMIN);
  const isModerator = checkUserRole(role, WarehouseRole.MODERATOR);
  const isContentCreator = checkUserRole(role, WarehouseRole.CONTENT_CREATOR);
  const isViewer = checkUserRole(role, WarehouseRole.VIEWER);

  return {
    isOwner,
    isAdmin,
    isModerator,
    isContentCreator,
    isViewer,
  };
}

export default useUserRole;

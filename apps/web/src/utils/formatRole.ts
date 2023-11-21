import { WarehouseRole } from "types/warehouse-role";

export function formatRole(role: WarehouseRole) {
  switch (role) {
    case WarehouseRole.ADMIN:
      return "Admin";
    case WarehouseRole.OWNER:
      return "Owner";
    case WarehouseRole.MODERATOR:
      return "Moderator";
    case WarehouseRole.VIEWER:
      return "Viewer";
    case WarehouseRole.CONTENT_CREATOR:
      return "Content Creator";
    default:
      return "Unknown";
  }
}

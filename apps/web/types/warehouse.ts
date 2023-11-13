import type { WarehouseRole } from "./warehouse-role";

export type Warehouse = {
  id: string;
  capacity: number;
  desc: string;
  logo: string;
  name: string;
  owner: string;
};

export type WarehouseListItem = {
  warehouse: Warehouse;
  role: WarehouseRole;
};

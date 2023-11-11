export const URLS = {
  dashboard: "/",
  login: "/login",
  register: "/register",
  createWarehouse: "/warehouse/create",
  warehouseDashboard: (id: string) => `/warehouse/${id}`,
  warehouseSettings: (id: string) => `/warehouse/${id}/settings`,
};

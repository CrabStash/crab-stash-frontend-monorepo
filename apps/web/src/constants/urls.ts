export const URLS = {
  dashboard: "/",
  login: "/login",
  profileSettings: "/profile/settings",
  securitySettings: "/profile/settings/security",
  register: "/register",
  createWarehouse: "/warehouse/create",
  warehouseDashboard: (id: string) => `/warehouse/${id}`,
  warehouseSettings: (id: string) => `/warehouse/${id}/settings`,
};

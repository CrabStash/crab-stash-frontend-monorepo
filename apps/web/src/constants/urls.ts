export const URLS = {
  dashboard: "/",
  login: "/login",
  profile: (id: string) => `/profile/${id}`,
  profileSettings: "/profile/settings",
  securitySettings: "/profile/settings/security",
  register: "/register",
  createWarehouse: "/warehouse/create",
  warehouseDashboard: (id: string) => `/warehouse/${id}`,
  warehouseSettings: (id: string) => `/warehouse/${id}/settings`,
};

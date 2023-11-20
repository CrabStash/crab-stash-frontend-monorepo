export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
  },
  user: {
    me: "/user/me",
  },
  warehouse: {
    warehouses: "/warehouse",
    createWarehouse: "/warehouse/create",
    info: (id: string) => `/warehouse/info/${id}`,
    update: (id: string) => `/warehouse/update/${id}`,
  },
};

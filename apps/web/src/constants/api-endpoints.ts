export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
  },
  user: {
    me: "/user/me",
    update: "/user/update",
    info: (warehouseId: string) => `/user/${warehouseId}`,
  },
  warehouse: {
    warehouses: "/warehouse",
    createWarehouse: "/warehouse/create",
    info: (warehouseId: string) => `/warehouse/info/${warehouseId}`,
    update: (warehouseId: string) => `/warehouse/update/${warehouseId}`,
    users: (warehouseId: string) => `/warehouse/users/${warehouseId}`,
    delete: (warehouseId: string) => `/warehouse/delete/${warehouseId}`,
    addUser: "/warehouse/users/add",
    removeUser: (warehouseId: string, userId: string) =>
      `/warehouse/users/delete/${warehouseId}/${userId}`,
    changeUserRole: "/warehouse/users/role",
  },
  schema: {
    field: "core/schemas/field",
  },
  core: {
    fields: {
      create: (warehouseId: string) => `/core/field/${warehouseId}`,
      list: (warehouseId: string) => `/core/field/warehouse/${warehouseId}`,
    },
  },
};

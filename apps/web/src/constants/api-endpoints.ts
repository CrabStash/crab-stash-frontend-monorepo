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
    category: "core/schemas/category",
    product: (warehouseId: string, categoryId: string) =>
      `/core/schemas/${categoryId}/warehouse/${warehouseId}`,
  },
  core: {
    fields: {
      create: (warehouseId: string) => `/core/field/${warehouseId}`,
      edit: (warehouseId: string, fieldId: string) =>
        `/core/field/${fieldId}/warehouse/${warehouseId}`,
      remove: (warehouseId: string, fieldId: string) =>
        `/core/field/${fieldId}/warehouse/${warehouseId}`,
      list: (warehouseId: string) => `/core/field/warehouse/${warehouseId}`,
      fieldById: (warehouseId: string, fieldId: string) =>
        `/core/field/${fieldId}/warehouse/${warehouseId}`,
    },
    categories: {
      list: (warehouseId: string) => `/core/category/warehouse/${warehouseId}`,
      categoryById: (warehouseId: string, categoryId: string) =>
        `/core/category/${categoryId}/warehouse/${warehouseId}`,
      categoryInheritanceById: (warehouseId: string, categoryId: string) =>
        `/core/schemas/${categoryId}/warehouse/${warehouseId}/inheritance`,
      create: (warehouseId: string) => `/core/category/${warehouseId}`,
      edit: (warehouseId: string, categoryId: string) =>
        `/core/category/${categoryId}/warehouse/${warehouseId}`,
      delete: (warehouseId: string, categoryId: string) =>
        `/core/category/${categoryId}/warehouse/${warehouseId}`,
    },
    products: {
      list: (warehouseId: string, cateogryId?: string) =>
        `/core/entity${cateogryId ? `/category/${cateogryId}` : ""}/warehouse/${warehouseId}`,
      create: (warehouseId: string, categoryId: string) =>
        `/core/entity/${categoryId}/warehouse/${warehouseId}`,
      remove: (warehouseId: string, productId: string, categoryId: string) =>
        `/core/entity/${productId}/category/${categoryId}/warehouse/${warehouseId}`,
      productById: (warehouseId: string, productId: string, categoryId: string) =>
        `/core/entity/${productId}/category/${categoryId}/warehouse/${warehouseId}`,
      edit: (warehouseId: string, productId: string, categoryId: string) =>
        `/core/entity/${productId}/category/${categoryId}/warehouse/${warehouseId}`,
    },
  },
};

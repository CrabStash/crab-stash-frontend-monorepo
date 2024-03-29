const docUrl = process.env.NEXT_PUBLIC_DOCS_URL;

export const URLS = {
  dashboard: "/",
  login: "/login",
  profile: (profileId: string) => `/profile/${profileId}`,
  profileSettings: "/profile/settings",
  securitySettings: "/profile/settings/security",
  register: "/register",
  createWarehouse: "/warehouse/create",
  warehouseDashboard: (warehouseId: string) => `/warehouse/${warehouseId}`,
  warehouseSettings: (warehouseId: string) => `/warehouse/${warehouseId}/settings`,
  fields: (warehouseId: string) => `/warehouse/${warehouseId}/fields`,
  categories: (warehouseId: string) => `/warehouse/${warehouseId}/categories`,
  categoryById: (warehouseId: string, categoryId: string) =>
    `/warehouse/${warehouseId}/categories/${categoryId}`,
  createCategory: (warehouseId: string) => `/warehouse/${warehouseId}/categories/create`,
  editCategory: (warehouseId: string, categoryId: string) =>
    `/warehouse/${warehouseId}/categories/${categoryId}/edit`,
  products: (warehouseId: string) => `/warehouse/${warehouseId}/products`,
  createField: (warehouseId: string) => `/warehouse/${warehouseId}/fields/create`,
  addProduct: (warehouseId: string) => `/warehouse/${warehouseId}/products/add`,
  editProduct: (warehouseId: string, categoryId: string, productId: string) =>
    `/warehouse/${warehouseId}/products/${categoryId}/${productId}/edit`,
  docs: docUrl,
  productById: (warehouseId: string, categoryId: string, productId: string) =>
    `/warehouse/${warehouseId}/products/${categoryId}/${productId}`,
};

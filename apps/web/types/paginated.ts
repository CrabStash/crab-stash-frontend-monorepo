export type Pagination = {
  limit: number;
  page: number;
  total: number;
};

export type Paginated<Data> = {
  list: Data[];
  pagination: Pagination;
};

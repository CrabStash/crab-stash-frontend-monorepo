import { useMemo, useState } from "react";

import type { PaginationState } from "@crab-stash/ui";

function usePaginatedTable() {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  return {
    pagination,
    setPagination,
    pageIndex,
    pageSize,
  };
}

export default usePaginatedTable;

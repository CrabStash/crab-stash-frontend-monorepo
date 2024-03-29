import { useRouter } from "next/router";

import useMeQuery from "./queries/use-me-query";

import { getWarehouseId } from "@app/utils/param-ids";

function useWarehouseId(): string | null {
  const router = useRouter();
  const { data } = useMeQuery();

  const warehouseId = getWarehouseId(router.query) || data?.response.data.default_warehouse || null;

  return warehouseId;
}

export default useWarehouseId;
